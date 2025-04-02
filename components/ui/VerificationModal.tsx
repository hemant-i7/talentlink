import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./dialog";
import { Button } from "./button";
import { Input } from "./input";
import { toast } from "sonner";
import { CheckCircle2, Loader2, XCircle, AlertCircle } from "lucide-react";

interface VerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onVerify: (email: string) => Promise<void>;
}

type VerificationStep = {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'loading' | 'success' | 'error';
};

export const VerificationModal = ({ isOpen, onClose, onVerify }: VerificationModalProps) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [steps, setSteps] = useState<VerificationStep[]>([
        {
            id: 1,
            title: "Email Format Check",
            description: "Validating email format",
            status: 'pending'
        },
        {
            id: 2,
            title: "Business Email Check",
            description: "Verifying business email domain",
            status: 'pending'
        },
        {
            id: 3,
            title: "Domain Verification",
            description: "Checking business domain validity",
            status: 'pending'
        },
        {
            id: 4,
            title: "Final Verification",
            description: "Completing verification process",
            status: 'pending'
        }
    ]);

    const updateStepStatus = (stepId: number, status: 'loading' | 'success' | 'error') => {
        setSteps(steps.map(step =>
            step.id === stepId ? { ...step, status } : step
        ));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setIsVerified(false);

        try {
            // Step 1: Email Format Check
            updateStepStatus(1, 'loading');
            if (!email.includes('@') || !email.includes('.')) {
                throw new Error('Invalid email format');
            }
            updateStepStatus(1, 'success');

            // Step 2: Business Email Check
            updateStepStatus(2, 'loading');
            const domain = email.split('@')[1].toLowerCase();
            if (domain === 'gmail.com' || domain === 'yahoo.com' || domain === 'hotmail.com') {
                throw new Error('Please use your business email address. Personal email addresses are not accepted.');
            }
            updateStepStatus(2, 'success');

            // Step 3: Domain Verification
            updateStepStatus(3, 'loading');
            const response = await fetch('/api/verify-business-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('Invalid business email domain');
            }
            updateStepStatus(3, 'success');

            // Step 4: Final Verification
            updateStepStatus(4, 'loading');
            await onVerify(email);
            updateStepStatus(4, 'success');
            setIsVerified(true);

            toast.success("Email verified successfully! Welcome to TalentLink.");
            // Only close after successful verification
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (error) {
            const currentStep = steps.find(step => step.status === 'loading')?.id || 1;
            updateStepStatus(currentStep, 'error');
            toast.error(error instanceof Error ? error.message : "Failed to verify email. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const getStepIcon = (status: VerificationStep['status']) => {
        switch (status) {
            case 'success':
                return <CheckCircle2 className="h-5 w-5 text-green-500" />;
            case 'error':
                return <XCircle className="h-5 w-5 text-red-500" />;
            case 'loading':
                return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
            default:
                return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />;
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open && !isVerified) {
                toast.error("Please complete the verification process");
                return;
            }
            onClose();
        }}>
            <DialogContent className="sm:max-w-[600px] bg-zinc-800/95 border-zinc-700">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-zinc-100 flex items-center">
                        <CheckCircle2 className="w-5 h-5 mr-2 text-zinc-400" />
                        Verify Your Identity
                    </DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Please enter your business email to verify your identity as a brand manager.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-yellow-300 bg-yellow-950/50 border border-yellow-900/50 p-3 rounded-md">
                            <AlertCircle className="h-4 w-4" />
                            <p>Personal email addresses (Gmail, Yahoo, Hotmail) are not accepted. Please use your company email.</p>
                        </div>
                        <Input
                            type="email"
                            placeholder="Enter your business email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600"
                            disabled={isLoading}
                        />
                    </div>

                    {/* Verification Steps */}
                    <div className="space-y-4 bg-zinc-900/50 p-4 rounded-lg">
                        {steps.map((step) => (
                            <div key={step.id} className="flex items-start space-x-4">
                                <div className="flex-shrink-0 mt-1">
                                    {getStepIcon(step.status)}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-zinc-200">{step.title}</h4>
                                    <p className="text-sm text-zinc-400">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-zinc-700 hover:bg-zinc-600 text-zinc-100"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            "Verify Email"
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}; 