-- Create rooftop_scans table for AI-powered solar panel detection
CREATE TABLE IF NOT EXISTS public.rooftop_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  has_solar_panels BOOLEAN DEFAULT FALSE,
  panel_count INTEGER DEFAULT 0,
  coverage_percentage DECIMAL(5, 2) DEFAULT 0,
  confidence_score DECIMAL(5, 2) DEFAULT 0,
  scan_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  image_url TEXT,
  detection_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_rooftop_scans_user_id ON public.rooftop_scans(user_id);

-- Create index on scan_date for time-based queries
CREATE INDEX IF NOT EXISTS idx_rooftop_scans_date ON public.rooftop_scans(scan_date DESC);

-- Create index on has_solar_panels for filtering
CREATE INDEX IF NOT EXISTS idx_rooftop_scans_has_panels ON public.rooftop_scans(has_solar_panels);

-- Enable RLS
ALTER TABLE public.rooftop_scans ENABLE ROW LEVEL SECURITY;

-- Users can view their own rooftop scans
CREATE POLICY "Users can view their own rooftop scans"
  ON public.rooftop_scans FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own rooftop scans
CREATE POLICY "Users can insert their own rooftop scans"
  ON public.rooftop_scans FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own rooftop scans
CREATE POLICY "Users can update their own rooftop scans"
  ON public.rooftop_scans FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own rooftop scans
CREATE POLICY "Users can delete their own rooftop scans"
  ON public.rooftop_scans FOR DELETE
  USING (auth.uid() = user_id);

-- Create trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at on rooftop_scans
CREATE TRIGGER update_rooftop_scans_updated_at
  BEFORE UPDATE ON public.rooftop_scans
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE public.rooftop_scans IS 'Stores rooftop analysis scans with AI-detected solar panel information';
COMMENT ON COLUMN public.rooftop_scans.has_solar_panels IS 'Whether solar panels were detected on the rooftop';
COMMENT ON COLUMN public.rooftop_scans.panel_count IS 'Number of solar panels detected';
COMMENT ON COLUMN public.rooftop_scans.coverage_percentage IS 'Percentage of rooftop covered by solar panels';
COMMENT ON COLUMN public.rooftop_scans.confidence_score IS 'AI detection confidence score (0-100)';
COMMENT ON COLUMN public.rooftop_scans.detection_data IS 'Raw detection data from Roboflow API';
