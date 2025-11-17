-- Create scans table for satellite roof scans
CREATE TABLE public.scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  total_roof_area DECIMAL(10, 2),
  usable_solar_area DECIMAL(10, 2),
  shaded_area DECIMAL(10, 2),
  estimated_capacity DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.scans ENABLE ROW LEVEL SECURITY;

-- Users can view their own scans
CREATE POLICY "Users can view their own scans"
  ON public.scans FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own scans
CREATE POLICY "Users can insert their own scans"
  ON public.scans FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own scans
CREATE POLICY "Users can update their own scans"
  ON public.scans FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own scans
CREATE POLICY "Users can delete their own scans"
  ON public.scans FOR DELETE
  USING (auth.uid() = user_id);

-- Create proposals table
CREATE TABLE public.proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  scan_id UUID REFERENCES public.scans(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  client_email TEXT,
  client_phone TEXT,
  system_capacity DECIMAL(10, 2),
  total_cost DECIMAL(15, 2),
  status TEXT DEFAULT 'draft',
  cover_page_data JSONB,
  overview_data JSONB,
  boq_data JSONB,
  financials_data JSONB,
  terms_data JSONB,
  roi_data JSONB,
  emi_data JSONB,
  assessment_data JSONB,
  feasibility_data JSONB,
  digital_signature TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;

-- Users can view their own proposals
CREATE POLICY "Users can view their own proposals"
  ON public.proposals FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own proposals
CREATE POLICY "Users can insert their own proposals"
  ON public.proposals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own proposals
CREATE POLICY "Users can update their own proposals"
  ON public.proposals FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own proposals
CREATE POLICY "Users can delete their own proposals"
  ON public.proposals FOR DELETE
  USING (auth.uid() = user_id);

-- Create trigger for updated_at on scans
CREATE TRIGGER update_scans_updated_at
  BEFORE UPDATE ON public.scans
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for updated_at on proposals
CREATE TRIGGER update_proposals_updated_at
  BEFORE UPDATE ON public.proposals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();