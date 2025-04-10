
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { ScraperService } from '@/utils/ScraperService';
import { AlertCircle, RefreshCw, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ScraperControlsProps {
  onStartScraping: (options: ScraperOptions) => void;
  isLoading?: boolean;
}

export interface ScraperOptions {
  sites: string[];
  maxProducts: number;
  useProxy: boolean;
  cacheResults: boolean;
  category: string;
}

const ScraperControls: React.FC<ScraperControlsProps> = ({
  onStartScraping,
  isLoading = false
}) => {
  const { toast } = useToast();
  const [maxProducts, setMaxProducts] = useState(50);
  const [useProxy, setUseProxy] = useState(false);
  const [cacheResults, setCacheResults] = useState(true);
  const [category, setCategory] = useState('');
  const [selectedSites, setSelectedSites] = useState<string[]>(
    ScraperService.supportedSites.map(site => site.name)
  );

  const handleSiteToggle = (siteName: string) => {
    setSelectedSites(prev => 
      prev.includes(siteName)
        ? prev.filter(name => name !== siteName)
        : [...prev, siteName]
    );
  };

  const handleSelectAll = () => {
    setSelectedSites(ScraperService.supportedSites.map(site => site.name));
  };

  const handleSelectNone = () => {
    setSelectedSites([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedSites.length === 0) {
      toast({
        title: "No sites selected",
        description: "Please select at least one site to scrape from",
        variant: "destructive"
      });
      return;
    }
    
    const options: ScraperOptions = {
      sites: selectedSites,
      maxProducts,
      useProxy,
      cacheResults,
      category: category || 'general'
    };
    
    onStartScraping(options);
  };

  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm border p-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Settings className="h-5 w-5 mr-2" />
        Web Scraper Controls
      </h3>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="category">Product Category</Label>
            <Input 
              id="category" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              placeholder="e.g., smartphones, laptops, headphones"
            />
            <p className="text-xs text-muted-foreground">
              Enter a product category to scrape
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="sites">
              <AccordionTrigger>
                Select Sites ({selectedSites.length}/{ScraperService.supportedSites.length})
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Button type="button" variant="outline" size="sm" onClick={handleSelectAll}>
                      Select All
                    </Button>
                    <Button type="button" variant="outline" size="sm" onClick={handleSelectNone}>
                      Clear All
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-2">
                    {ScraperService.supportedSites.map((site) => (
                      <div key={site.name} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`site-${site.name}`} 
                          checked={selectedSites.includes(site.name)}
                          onCheckedChange={() => handleSiteToggle(site.name)}
                        />
                        <Label htmlFor={`site-${site.name}`}>{site.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="options">
              <AccordionTrigger>Advanced Options</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="max-products">Maximum Products: {maxProducts}</Label>
                    </div>
                    <Slider 
                      id="max-products"
                      value={[maxProducts]} 
                      onValueChange={(values) => setMaxProducts(values[0])} 
                      min={10} 
                      max={100} 
                      step={10}
                    />
                    <p className="text-xs text-muted-foreground">
                      Control how many products to scrape
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="use-proxy">Use Proxy Rotation</Label>
                      <p className="text-xs text-muted-foreground">
                        Use IP rotation to avoid detection
                      </p>
                    </div>
                    <Switch 
                      id="use-proxy" 
                      checked={useProxy} 
                      onCheckedChange={setUseProxy} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="cache-results">Cache Results</Label>
                      <p className="text-xs text-muted-foreground">
                        Store scraped data in cache
                      </p>
                    </div>
                    <Switch 
                      id="cache-results" 
                      checked={cacheResults} 
                      onCheckedChange={setCacheResults} 
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="bg-amber-50 border border-amber-200 rounded p-3 text-sm text-amber-800 flex">
            <AlertCircle className="h-5 w-5 mt-0.5 mr-2 shrink-0" />
            <div>
              <p className="font-medium">Web Scraping Notice</p>
              <p className="text-xs mt-1">
                This is a simulation only. In a real implementation, you would need to:
              </p>
              <ul className="text-xs list-disc pl-5 mt-1 space-y-1">
                <li>Check each website's Terms of Service</li>
                <li>Respect robots.txt directives</li>
                <li>Implement rate limiting and delays</li>
                <li>Consider legal implications in your jurisdiction</li>
              </ul>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || selectedSites.length === 0}
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Scraping...
              </>
            ) : (
              'Start Scraping'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ScraperControls;
