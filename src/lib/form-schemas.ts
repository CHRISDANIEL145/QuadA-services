// lib/form-schemas.ts
// Dynamic field config for enquiry form — keyed by category slug
// Maps to service_categories.slug in the database

export interface FormField {
  id: string
  label: string
  type: 'text' | 'select' | 'textarea' | 'date' | 'multiselect'
  placeholder?: string
  options?: string[]
  required?: boolean
}

export interface CategoryFormSchema {
  fields: FormField[]
}

export const SERVICE_FORM_SCHEMAS: Record<string, CategoryFormSchema> = {
  'home-maintenance': {
    fields: [
      {
        id: 'property_type',
        label: 'Property Type',
        type: 'select',
        options: ['Apartment', 'Independent House', 'Villa', 'Shop/Commercial', 'Land'],
        required: true,
      },
      {
        id: 'property_size',
        label: 'Property Size (approx)',
        type: 'text',
        placeholder: 'e.g. 1000 sq ft, 2 BHK',
      },
      {
        id: 'services_needed',
        label: 'Services Needed',
        type: 'select',
        options: ['Painting', 'Electrical', 'Plumbing', 'Cleaning', 'Gardening', 'Carpentry', 'Other'],
      },
      {
        id: 'urgency',
        label: 'When do you need this?',
        type: 'select',
        options: ['Within 24 hours', 'Within 3 days', 'This week', 'This month', 'Just checking'],
      },
    ],
  },

  'personal-care-support': {
    fields: [
      {
        id: 'care_type',
        label: 'Type of Care Needed',
        type: 'select',
        options: ['Child Care', 'Senior/Elderly Care', 'Nursing', 'Physiotherapy', 'Cook', 'Companion'],
        required: true,
      },
      {
        id: 'person_name',
        label: 'Name of Person Requiring Care',
        type: 'text',
        placeholder: 'e.g. Grandfather, Child name',
      },
      {
        id: 'care_schedule',
        label: 'Schedule Required',
        type: 'select',
        options: ['Daily full-time', 'Daily part-time', 'Weekend only', 'Specific days', 'One-time visit'],
      },
      {
        id: 'special_requirements',
        label: 'Special Medical Requirements',
        type: 'textarea',
        placeholder: 'Any medical conditions, medications, or special needs we should know about',
      },
    ],
  },

  'events-functions': {
    fields: [
      {
        id: 'event_type',
        label: 'Event Type',
        type: 'select',
        options: [
          'Marriage/Wedding', 'Birthday', 'Anniversary', 'Corporate Event',
          'Office Party', 'Get-together', 'Other',
        ],
        required: true,
      },
      {
        id: 'event_date',
        label: 'Event Date',
        type: 'date',
        required: true,
      },
      {
        id: 'guest_count',
        label: 'Expected Guests',
        type: 'select',
        options: ['Up to 50', '50–100', '100–200', '200–500', '500+'],
      },
      {
        id: 'venue',
        label: 'Venue (if already decided)',
        type: 'text',
        placeholder: 'Hall name, address, or TBD',
      },
      {
        id: 'services_needed',
        label: 'Services Required',
        type: 'select',
        options: ['Catering', 'Decoration', 'Photography/Videography', 'Makeup', 'Sound/Light', 'Invitation Cards', 'Welcome/Hospitality'],
      },
    ],
  },

  'real-estate-property': {
    fields: [
      {
        id: 'transaction_type',
        label: 'I want to',
        type: 'select',
        options: ['Buy Property', 'Sell Property', 'Rent/Lease', 'Get Renovation/Clearance', 'Just Enquiry'],
        required: true,
      },
      {
        id: 'property_type',
        label: 'Property Type',
        type: 'select',
        options: ['Land/Plot', 'Flat/Apartment', 'Independent House', 'Villa', 'Commercial Space', 'Office'],
      },
      {
        id: 'location_preference',
        label: 'Preferred Location',
        type: 'text',
        placeholder: 'Area, street, or locality preference',
      },
      {
        id: 'budget_range',
        label: 'Budget Range',
        type: 'select',
        options: ['Under ₹25L', '₹25L–50L', '₹50L–1Cr', '₹1Cr–2Cr', 'Above ₹2Cr', 'Not decided'],
      },
    ],
  },

  'financial-advisory': {
    fields: [
      {
        id: 'service_type',
        label: 'Financial Service',
        type: 'select',
        options: [
          'Life Insurance', 'Health Insurance', 'Vehicle Insurance',
          'Mutual Funds', 'Fixed Deposits', 'Loan', 'Business Services', 'Tax Filing',
        ],
        required: true,
      },
      {
        id: 'for_whom',
        label: 'This is for',
        type: 'select',
        options: ['Self', 'Family', 'Business/Company', 'Other'],
      },
      {
        id: 'existing_policy',
        label: 'Existing policy or investment?',
        type: 'select',
        options: ['Yes, looking to review', 'Yes, looking to add more', 'No, starting fresh'],
      },
    ],
  },

  'personal-sourcing-supply': {
    fields: [
      {
        id: 'service_type',
        label: 'Service Type',
        type: 'select',
        options: [
          'Trip Planning', 'Packers & Movers', 'Grocery Supply',
          'Meat/Fruits/Vegetables', 'Ironing/Laundry', 'Travel Booking', 'Other',
        ],
        required: true,
      },
      {
        id: 'frequency',
        label: 'Frequency',
        type: 'select',
        options: ['One-time', 'Weekly', 'Monthly', 'Regular ongoing'],
      },
      {
        id: 'delivery_address',
        label: 'Delivery / Service Address',
        type: 'textarea',
        placeholder: 'Full address for delivery or service',
      },
    ],
  },

  'property-clearance-scrap': {
    fields: [
      {
        id: 'clearance_type',
        label: 'Clearance Type',
        type: 'select',
        options: ['Full Property Clearance', 'Scrap Buying', 'Demolition Assistance', 'Waste Disposal', 'Other'],
        required: true,
      },
      {
        id: 'property_size',
        label: 'Property Size (approx)',
        type: 'text',
        placeholder: 'e.g. 500 sq ft, 2 floors',
      },
    ],
  },

  'on-demand': {
    fields: [
      {
        id: 'related_category',
        label: 'Related Service Category',
        type: 'select',
        options: ['Home Maintenance', 'Personal Care', 'Events', 'Real Estate', 'Financial', 'Sourcing', 'Other'],
      },
    ],
  },

  // Default fallback for unknown categories
  default: {
    fields: [
      {
        id: 'property_type',
        label: 'Related Property / Location Type',
        type: 'select',
        options: ['Home/Residence', 'Office/Business', 'Land/Plot', 'Not applicable'],
      },
    ],
  },
}

export function getFormSchema(categorySlug: string | null | undefined): CategoryFormSchema {
  if (!categorySlug) return SERVICE_FORM_SCHEMAS.default
  return SERVICE_FORM_SCHEMAS[categorySlug] ?? SERVICE_FORM_SCHEMAS.default
}
