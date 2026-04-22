'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, DollarSign, Clock, Sparkles, Scissors, Heart, Crown } from 'lucide-react';
import { Card, Badge, Button, Input, Textarea } from '@/components/ui';
import { SERVICE_CATEGORIES } from '@/lib/constants';

interface Service {
  _id: string;
  name: string;
  description: string;
  category: string;
  durationMinutes: number;
  basePrice: number;
  isActive: boolean;
}

const categoryIcons: Record<string, any> = {
  haircut: Scissors,
  coloring: Sparkles,
  treatment: Heart,
  styling: Crown,
  other: Sparkles,
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'haircut',
    durationMinutes: 60,
    basePrice: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/services');
      const data = await res.json();
      setServices(data.services || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const method = editingService ? 'PATCH' : 'POST';
    const url = editingService 
      ? `/api/admin/services/${editingService._id}`
      : '/api/admin/services';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        fetchServices();
        setShowModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    try {
      await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description || '',
      category: service.category,
      durationMinutes: service.durationMinutes,
      basePrice: service.basePrice,
      isActive: service.isActive,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingService(null);
    setFormData({
      name: '',
      description: '',
      category: 'haircut',
      durationMinutes: 60,
      basePrice: 0,
      isActive: true,
    });
  };

  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = [];
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="font-display text-3xl font-bold">Services</h1>
          <p className="text-zinc-400 mt-2">Manage your service offerings</p>
        </div>
        <Button 
          onClick={() => { resetForm(); setShowModal(true); }}
          className="gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600"
        >
          <Plus className="h-4 w-4" />
          Add Service
        </Button>
      </motion.div>

      {loading ? (
        <div className="py-12 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent mx-auto" />
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedServices).map(([category, categoryServices]) => {
            const Icon = categoryIcons[category] || Sparkles;
            return (
              <div key={category}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <Icon className="h-5 w-5 text-violet-400" />
                  </div>
                  <h2 className="font-display text-xl font-semibold capitalize">
                    {SERVICE_CATEGORIES.find(c => c.value === category)?.label || category}
                  </h2>
                  <Badge variant="outline">{categoryServices.length}</Badge>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {categoryServices.map((service) => (
                    <motion.div
                      key={service._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="border-white/5 bg-[#131316] p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">{service.name}</h3>
                            <p className="text-sm text-zinc-500 line-clamp-2">
                              {service.description}
                            </p>
                          </div>
                          <Badge variant={service.isActive ? 'default' : 'secondary'}>
                            {service.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-zinc-500 mb-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {service.durationMinutes} min
                          </div>
                          <div className="flex items-center gap-1 font-bold text-violet-400">
                            <DollarSign className="h-4 w-4" />
                            {service.basePrice}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleEdit(service)}
                            className="flex-1 border-white/10"
                          >
                            <Pencil className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDelete(service._id)}
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#131316] p-6"
          >
            <h2 className="font-display text-xl font-semibold mb-6">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-500 mb-2">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Service name"
                  required
                  className="border-white/10 bg-white/5"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-500 mb-2">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Service description"
                  rows={3}
                  className="border-white/10 bg-white/5"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-500 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2"
                  >
                    {SERVICE_CATEGORIES.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-zinc-500 mb-2">Duration (min)</label>
                  <Input
                    type="number"
                    value={formData.durationMinutes}
                    onChange={(e) => setFormData({ ...formData, durationMinutes: parseInt(e.target.value) })}
                    min={15}
                    max={240}
                    className="border-white/10 bg-white/5"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-zinc-500 mb-2">Price (£)</label>
                <Input
                  type="number"
                  value={formData.basePrice}
                  onChange={(e) => setFormData({ ...formData, basePrice: parseFloat(e.target.value) })}
                  min={0}
                  step={0.01}
                  className="border-white/10 bg-white/5"
                />
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="h-4 w-4 rounded border-white/20 bg-white/5"
                />
                <span className="text-sm">Active</span>
              </label>
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 bg-gradient-to-r from-violet-600 to-fuchsia-600">
                  {editingService ? 'Save Changes' : 'Add Service'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="border-white/10">
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}