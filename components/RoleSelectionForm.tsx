"use client";
import React, { useState } from 'react';
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from './ui/button';
import { Dialog } from '@/components/dialog';

import { Input } from "@/components/input"; // Make sure to adjust based on your imports
import { Label } from './ui/label';


// components/RoleSelectionForm.tsx



const RoleSelectionForm: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<'influencer' | 'brand' | 'manager' | null>(null);
  const [formData, setFormData] = useState({
    influencerName: '',
    socialLinks: '',
    brandName: '',
    brandWebsite: '',
    businessEmail: ''
  });
  const [emailError, setEmailError] = useState('');

  const handleRoleSelection = (selectedRole: 'influencer' | 'brand' | 'manager') => {
    setRole(selectedRole);
  };

  const validateBusinessEmail = (email: string) => {
    // Basic business email validation
    const businessDomains = ['@gmail.com', '@yahoo.com', '@hotmail.com'];
    const isBusinessEmail = !businessDomains.some(domain => email.toLowerCase().endsWith(domain));
    return isBusinessEmail;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'businessEmail') {
      if (!validateBusinessEmail(value)) {
        setEmailError('Please use a business email address');
      } else {
        setEmailError('');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (role === 'manager' && !validateBusinessEmail(formData.businessEmail)) {
      return;
    }

    // Handle form submission logic here
    console.log(formData);
    setOpen(false);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  return (
    <div className="flex flex-col gap-4">
      {session ? (
        <Button onClick={handleSignOut} variant="destructive">
          Sign Out
        </Button>
      ) : (
        <Button onClick={() => setOpen(true)}>Sign In</Button>
      )}

      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Select Your Role</h2>
          <div className="flex flex-col gap-4 mb-4">
            <Button onClick={() => handleRoleSelection('influencer')} className="w-full">
              I am an Influencer
            </Button>
            <Button onClick={() => handleRoleSelection('brand')} className="w-full">
              I am a Brand
            </Button>
            <Button onClick={() => handleRoleSelection('manager')} className="w-full">
              I am a Manager
            </Button>
          </div>

          {role && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {role === 'influencer' ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Influencer Form</h3>
                  <div>
                    <Label htmlFor="influencerName">Influencer Name</Label>
                    <Input
                      id="influencerName"
                      name="influencerName"
                      value={formData.influencerName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="socialLinks">Social Media Links</Label>
                    <Input
                      id="socialLinks"
                      name="socialLinks"
                      value={formData.socialLinks}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              ) : role === 'brand' ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Brand Form</h3>
                  <div>
                    <Label htmlFor="brandName">Brand Name</Label>
                    <Input
                      id="brandName"
                      name="brandName"
                      value={formData.brandName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="brandWebsite">Brand Website</Label>
                    <Input
                      id="brandWebsite"
                      name="brandWebsite"
                      value={formData.brandWebsite}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Manager Form</h3>
                  <div>
                    <Label htmlFor="businessEmail">Business Email</Label>
                    <Input
                      id="businessEmail"
                      name="businessEmail"
                      type="email"
                      value={formData.businessEmail}
                      onChange={handleChange}
                      required
                    />
                    {emailError && (
                      <p className="text-red-500 text-sm mt-1">{emailError}</p>
                    )}
                  </div>
                </div>
              )}
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default RoleSelectionForm;
