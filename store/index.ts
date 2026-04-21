import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BookingState {
  selectedService: string | null;
  selectedStylist: string | null;
  selectedDate: string | null;
  selectedTime: string | null;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  };
  setSelectedService: (id: string | null) => void;
  setSelectedStylist: (id: string | null) => void;
  setSelectedDate: (date: string | null) => void;
  setSelectedTime: (time: string | null) => void;
  setCustomerInfo: (info: Partial<BookingState['customerInfo']>) => void;
  reset: () => void;
}

const initialState = {
  selectedService: null,
  selectedStylist: null,
  selectedDate: null,
  selectedTime: null,
  customerInfo: {
    name: '',
    email: '',
    phone: '',
    notes: '',
  },
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      ...initialState,
      setSelectedService: (id) => set({ selectedService: id }),
      setSelectedStylist: (id) => set({ selectedStylist: id }),
      setSelectedDate: (date) => set({ selectedDate: date }),
      setSelectedTime: (time) => set({ selectedTime: time }),
      setCustomerInfo: (info) =>
        set((state) => ({
          customerInfo: { ...state.customerInfo, ...info },
        })),
      reset: () => set(initialState),
    }),
    { name: 'booking-store' }
  )
);

interface UIState {
  isMobileMenuOpen: boolean;
  isDarkMode: boolean;
  toggleMobileMenu: () => void;
  setDarkMode: (value: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isMobileMenuOpen: false,
      isDarkMode: false,
      toggleMobileMenu: () =>
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      setDarkMode: (value) => set({ isDarkMode: value }),
    }),
    { name: 'ui-store' }
  )
);