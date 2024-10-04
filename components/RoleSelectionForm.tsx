"use client";
import React, { useState } from 'react';


import { Button } from './ui/button';
import { Dialog } from '@/components/dialog';

import { Input } from "@/components/input"; // Make sure to adjust based on your imports
import { Label } from './ui/label';


// components/RoleSelectionForm.tsx



const RoleSelectionForm: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<'influencer' | 'brand' | null>(null);
  const [formData, setFormData] = useState({
    influencerName: '',
    socialLinks: '',
    brandName: '',
    brandWebsite: ''
  });

  const handleRoleSelection = (selectedRole: 'influencer' | 'brand') => {
    setRole(selectedRole);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    setOpen(false); // Close the dialog after submission
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Role Selection</Button>
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <div className="p-4"> {/* Add padding to the dialog content */}
          <h2>Select Your Role</h2>
          <div className="flex space-x-4 mb-4">
            <Button onClick={() => handleRoleSelection('influencer')}>I am an Influencer</Button>
            <Button onClick={() => handleRoleSelection('brand')}>I am a Brand</Button>
          </div>

          {role && (
            <form onSubmit={handleSubmit}>
              {role === 'influencer' ? (
                <div>
                  <h3>Influencer Form</h3>
                  <Label htmlFor="influencerName">Influencer Name</Label>
                  <Input 
                    id="influencerName" 
                    name="influencerName" 
                    value={formData.influencerName} 
                    onChange={handleChange} 
                    required 
                  />
                  <Label htmlFor="socialLinks">Social Media Links</Label>
                  <Input 
                    id="socialLinks" 
                    name="socialLinks" 
                    value={formData.socialLinks} 
                    onChange={handleChange} 
                    required 
                  />
                  {/* Add more influencer-specific fields here */}
                </div>
              ) : (
                <div>
                  <h3>Brand Form</h3>
                  <Label htmlFor="brandName">Brand Name</Label>
                  <Input 
                    id="brandName" 
                    name="brandName" 
                    value={formData.brandName} 
                    onChange={handleChange} 
                    required 
                  />
                  <Label htmlFor="brandWebsite">Brand Website</Label>
                  <Input 
                    id="brandWebsite" 
                    name="brandWebsite" 
                    value={formData.brandWebsite} 
                    onChange={handleChange} 
                    required 
                  />
                  {/* Add more brand-specific fields here */}
                </div>
              )}
              <Button type="submit">Submit</Button>
            </form>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default RoleSelectionForm;
