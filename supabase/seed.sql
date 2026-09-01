-- ============================================================
-- QuadA Services — Seed Data
-- Run AFTER schema.sql and rls.sql
-- This is development/demo seed data only
-- ============================================================

-- ============================================================
-- SERVICE CATEGORIES
-- ============================================================
INSERT INTO service_categories (id, name, slug, description, sort_order, is_active) VALUES
  ('10000000-0000-0000-0000-000000000001', 'Home & Maintenance', 'home-maintenance', 'Complete home repair, upkeep, and maintenance services for every household need.', 1, true),
  ('10000000-0000-0000-0000-000000000002', 'Cleaning & Housekeeping', 'cleaning-housekeeping', 'Professional cleaning services for homes, offices, and commercial spaces.', 2, true),
  ('10000000-0000-0000-0000-000000000003', 'Senior Citizen Assistance', 'senior-citizen-assistance', 'Compassionate support services designed specifically for elderly individuals.', 3, true),
  ('10000000-0000-0000-0000-000000000004', 'Child Care & Tuition', 'child-care-tuition', 'Trusted child care and educational support for families.', 4, true),
  ('10000000-0000-0000-0000-000000000005', 'Personal & Doorstep Services', 'personal-doorstep-services', 'Convenient services brought directly to your door.', 5, true),
  ('10000000-0000-0000-0000-000000000006', 'Interior & Renovation', 'interior-renovation', 'Expert interior design, furnishing, and renovation services.', 6, true),
  ('10000000-0000-0000-0000-000000000007', 'Real Estate & Property', 'real-estate-property', 'Professional real estate assistance for buying, selling, and rental needs.', 7, true),
  ('10000000-0000-0000-0000-000000000008', 'Office & Corporate Services', 'office-corporate-services', 'Comprehensive support services for businesses and corporate offices.', 8, true),
  ('10000000-0000-0000-0000-000000000009', 'Event & Travel Services', 'event-travel-services', 'End-to-end event planning and travel coordination services.', 9, true),
  ('10000000-0000-0000-0000-000000000010', 'Grocery & Daily Needs', 'grocery-daily-needs', 'Fresh groceries, essentials, and daily supplies delivered to you.', 10, true),
  ('10000000-0000-0000-0000-000000000011', 'Gardening & Farming', 'gardening-farming', 'Professional gardening, landscaping, and farming assistance.', 11, true),
  ('10000000-0000-0000-0000-000000000012', 'On-Demand Services', 'on-demand-services', 'Quick, flexible services available when you need them most.', 12, true)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- SERVICES
-- ============================================================
INSERT INTO services (id, category_id, name, slug, short_description, description, display_price, pricing_type, enquiry_config, sort_order, is_active) VALUES
  -- Home & Maintenance
  (
    '20000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    'Plumbing Repair',
    'plumbing-repair',
    'Fast, reliable plumbing repairs for leaks, blockages, and installations.',
    'Our certified plumbers handle everything from minor leaks to major pipe installations. Available for emergency calls, routine repairs, and new fixture installations across all residential and commercial properties.',
    'Starting from ₹499',
    'from',
    '{"custom_fields": [{"name": "issue_type", "label": "Type of Issue", "type": "select", "options": ["Leak", "Blockage", "Installation", "Other"], "required": true}]}',
    1,
    true
  ),
  (
    '20000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000001',
    'Electrical Work',
    'electrical-work',
    'Licensed electrical repairs, installations, and safety checks.',
    'Certified electricians for all your electrical needs — wiring, repairs, new installations, safety audits, and emergency services. We ensure all work meets local safety standards.',
    'Starting from ₹599',
    'from',
    '{"custom_fields": [{"name": "work_type", "label": "Type of Work", "type": "select", "options": ["Repair", "New Installation", "Safety Audit", "Emergency"], "required": true}]}',
    2,
    true
  ),
  -- Cleaning
  (
    '20000000-0000-0000-0000-000000000003',
    '10000000-0000-0000-0000-000000000002',
    'Home Deep Cleaning',
    'home-deep-cleaning',
    'Thorough deep cleaning of your entire home by trained professionals.',
    'Our deep cleaning service covers every corner of your home — kitchen, bathrooms, bedrooms, living areas, and more. We use professional-grade equipment and eco-friendly cleaning products.',
    'Starting from ₹1,499',
    'from',
    '{"custom_fields": [{"name": "property_type", "label": "Property Type", "type": "select", "options": ["Apartment", "Independent House", "Villa", "Office"], "required": true}, {"name": "bhk", "label": "Size (BHK)", "type": "select", "options": ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"], "required": true}]}',
    1,
    true
  ),
  (
    '20000000-0000-0000-0000-000000000004',
    '10000000-0000-0000-0000-000000000002',
    'Regular Housekeeping',
    'regular-housekeeping',
    'Trained housekeeping staff for daily, weekly, or monthly schedules.',
    'Professional housekeeping staff available on your preferred schedule. Our staff are background-verified, trained in modern cleaning techniques, and fully insured.',
    'Custom Quote',
    'quote',
    '{"custom_fields": [{"name": "frequency", "label": "Frequency", "type": "select", "options": ["Daily", "Weekly", "Bi-weekly", "Monthly"], "required": true}, {"name": "hours_per_day", "label": "Hours Required", "type": "select", "options": ["2 hours", "4 hours", "6 hours", "Full Day"], "required": true}]}',
    2,
    true
  ),
  -- Senior Care
  (
    '20000000-0000-0000-0000-000000000005',
    '10000000-0000-0000-0000-000000000003',
    'Elder Care Companion',
    'elder-care-companion',
    'Compassionate companionship and assistance for elderly family members.',
    'Trained caregivers provide companionship, medication reminders, meal assistance, and light household help for senior citizens. Available for day, night, or 24-hour shifts.',
    'Custom Quote',
    'quote',
    '{"custom_fields": [{"name": "care_type", "label": "Care Required", "type": "select", "options": ["Companionship", "Medical Assistance", "Mobility Support", "All-round Care"], "required": true}, {"name": "shift", "label": "Shift Required", "type": "select", "options": ["Day (8am-8pm)", "Night (8pm-8am)", "24 Hours"], "required": true}]}',
    1,
    true
  ),
  -- Interior
  (
    '20000000-0000-0000-0000-000000000006',
    '10000000-0000-0000-0000-000000000006',
    'Interior Design Consultation',
    'interior-design-consultation',
    'Expert interior design consultation and project execution for homes and offices.',
    'Our interior design team creates beautiful, functional spaces that reflect your lifestyle and personality. From concept to completion, we handle every detail of your interior project.',
    'Custom Quote',
    'quote',
    '{"custom_fields": [{"name": "project_type", "label": "Project Type", "type": "select", "options": ["New Construction", "Renovation", "Partial Redesign", "Single Room"], "required": true}, {"name": "property_type", "label": "Property Type", "type": "select", "options": ["Apartment", "Villa", "Office", "Commercial Space"], "required": true}, {"name": "area_sqft", "label": "Approximate Area (sq ft)", "type": "text", "required": false}]}',
    1,
    true
  ),
  -- Real Estate
  (
    '20000000-0000-0000-0000-000000000007',
    '10000000-0000-0000-0000-000000000007',
    'Property Buy / Sell Assistance',
    'property-buy-sell',
    'Professional assistance for buying or selling residential and commercial properties.',
    'Our real estate experts guide you through every step of the buying or selling process — property search, legal verification, negotiation, documentation, and registration.',
    'Commission-based',
    'quote',
    '{"custom_fields": [{"name": "transaction_type", "label": "I want to", "type": "select", "options": ["Buy a Property", "Sell a Property", "Both Buy and Sell"], "required": true}, {"name": "property_type", "label": "Property Type", "type": "select", "options": ["Apartment", "Independent House", "Villa", "Plot", "Commercial"], "required": true}]}',
    1,
    true
  ),
  -- Events
  (
    '20000000-0000-0000-0000-000000000008',
    '10000000-0000-0000-0000-000000000009',
    'Event Planning & Management',
    'event-planning',
    'Complete event management for weddings, corporate events, and celebrations.',
    'Our event management team handles end-to-end coordination for events of all sizes — from intimate family gatherings to large corporate conferences and wedding celebrations.',
    'Custom Quote',
    'quote',
    '{"custom_fields": [{"name": "event_type", "label": "Event Type", "type": "select", "options": ["Wedding", "Birthday", "Corporate Event", "Anniversary", "Other"], "required": true}, {"name": "guest_count", "label": "Expected Guests", "type": "select", "options": ["< 50", "50-100", "100-250", "250-500", "500+"], "required": true}]}',
    1,
    true
  )
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- SERVICE AREAS
-- ============================================================
INSERT INTO service_areas (name, state, is_active) VALUES
  ('Chennai', 'Tamil Nadu', true),
  ('Coimbatore', 'Tamil Nadu', true),
  ('Madurai', 'Tamil Nadu', true),
  ('Tiruchirappalli', 'Tamil Nadu', true),
  ('Salem', 'Tamil Nadu', true),
  ('Tirunelveli', 'Tamil Nadu', true),
  ('Erode', 'Tamil Nadu', true),
  ('Vellore', 'Tamil Nadu', true),
  ('Thanjavur', 'Tamil Nadu', true),
  ('Dindigul', 'Tamil Nadu', true),
  ('Kancheepuram', 'Tamil Nadu', true),
  ('Tiruppur', 'Tamil Nadu', true)
ON CONFLICT DO NOTHING;
