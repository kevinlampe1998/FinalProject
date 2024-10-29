import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CreditCard, Calendar, Lock } from "lucide-react";

const PaymentForm = () => {
    const [formData, setFormData] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardHolder: "",
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.cardNumber.match(/^\d{16}$/)) {
            newErrors.cardNumber =
                "Bitte geben Sie eine gültige 16-stellige Kartennummer ein";
        }

        if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
            newErrors.expiryDate =
                "Bitte geben Sie ein gültiges Ablaufdatum ein (MM/YY)";
        }

        if (!formData.cvv.match(/^\d{3,4}$/)) {
            newErrors.cvv = "Bitte geben Sie einen gültigen CVV-Code ein";
        }

        if (formData.cardHolder.length < 3) {
            newErrors.cardHolder =
                "Bitte geben Sie den Namen des Karteninhabers ein";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Hier können Sie die Zahlungsverarbeitung implementieren
            console.log("Payment data:", formData);
            alert("Zahlung erfolgreich!");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                    Zahlungsinformationen
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="cardHolder">Karteninhaber</Label>
                        <Input
                            id="cardHolder"
                            name="cardHolder"
                            placeholder="Max Mustermann"
                            value={formData.cardHolder}
                            onChange={handleInputChange}
                            className={
                                errors.cardHolder ? "border-red-500" : ""
                            }
                        />
                        {errors.cardHolder && (
                            <p className="text-sm text-red-500">
                                {errors.cardHolder}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cardNumber">Kartennummer</Label>
                        <div className="relative">
                            <Input
                                id="cardNumber"
                                name="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                maxLength={16}
                                className={
                                    errors.cardNumber
                                        ? "border-red-500 pr-10"
                                        : "pr-10"
                                }
                            />
                            <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                        {errors.cardNumber && (
                            <p className="text-sm text-red-500">
                                {errors.cardNumber}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="expiryDate">Gültig bis</Label>
                            <div className="relative">
                                <Input
                                    id="expiryDate"
                                    name="expiryDate"
                                    placeholder="MM/YY"
                                    value={formData.expiryDate}
                                    onChange={handleInputChange}
                                    maxLength={5}
                                    className={
                                        errors.expiryDate
                                            ? "border-red-500 pr-10"
                                            : "pr-10"
                                    }
                                />
                                <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                            {errors.expiryDate && (
                                <p className="text-sm text-red-500">
                                    {errors.expiryDate}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <div className="relative">
                                <Input
                                    id="cvv"
                                    name="cvv"
                                    type="password"
                                    placeholder="123"
                                    value={formData.cvv}
                                    onChange={handleInputChange}
                                    maxLength={4}
                                    className={
                                        errors.cvv
                                            ? "border-red-500 pr-10"
                                            : "pr-10"
                                    }
                                />
                                <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                            {errors.cvv && (
                                <p className="text-sm text-red-500">
                                    {errors.cvv}
                                </p>
                            )}
                        </div>
                    </div>

                    <Button type="submit" className="w-full">
                        Jetzt bezahlen
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default PaymentForm;
