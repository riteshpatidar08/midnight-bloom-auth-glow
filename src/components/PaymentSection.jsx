
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Wallet, Smartphone, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PaymentSection = ({ totalAmount, selectedAddress }) => {
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'wallet', name: 'Digital Wallet', icon: Wallet },
    { id: 'cash', name: 'Cash on Delivery', icon: Smartphone }
  ];

  const handlePaymentChange = (field, value) => {
    setPaymentDetails(prev => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast({
        title: "Address Required",
        description: "Please select a delivery address",
        variant: "destructive"
      });
      return;
    }

    if (selectedPayment === 'card') {
      if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv || !paymentDetails.cardName) {
        toast({
          title: "Payment Details Required",
          description: "Please fill in all card details",
          variant: "destructive"
        });
        return;
      }
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Order Placed Successfully!",
        description: `Your order of $${totalAmount.toFixed(2)} has been confirmed. Estimated delivery: 30-45 minutes.`,
        action: <CheckCircle className="w-4 h-4 text-green-500" />
      });
    }, 2000);
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="w-5 h-5 text-primary" />
          <span>Payment Method</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payment Method Selection */}
        <div className="space-y-3">
          {paymentMethods.map((method) => {
            const IconComponent = method.icon;
            return (
              <div
                key={method.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedPayment === method.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedPayment(method.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <IconComponent className="w-5 h-5 text-primary" />
                    <span className="font-medium">{method.name}</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedPayment === method.id
                      ? 'border-primary bg-primary'
                      : 'border-muted-foreground'
                  }`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Card Details Form */}
        {selectedPayment === 'card' && (
          <div className="space-y-4 p-4 border border-primary/20 rounded-lg bg-card/30">
            <h3 className="font-semibold text-foreground">Card Details</h3>
            
            <div className="space-y-2">
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                placeholder="John Doe"
                value={paymentDetails.cardName}
                onChange={(e) => handlePaymentChange('cardName', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={paymentDetails.cardNumber}
                onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                maxLength={19}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={paymentDetails.expiryDate}
                  onChange={(e) => handlePaymentChange('expiryDate', e.target.value)}
                  maxLength={5}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={paymentDetails.cvv}
                  onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                  maxLength={3}
                />
              </div>
            </div>
          </div>
        )}

        {/* Digital Wallet Info */}
        {selectedPayment === 'wallet' && (
          <div className="p-4 border border-primary/20 rounded-lg bg-card/30">
            <p className="text-muted-foreground text-sm">
              You will be redirected to your digital wallet to complete the payment.
            </p>
          </div>
        )}

        {/* Cash on Delivery Info */}
        {selectedPayment === 'cash' && (
          <div className="p-4 border border-primary/20 rounded-lg bg-card/30">
            <p className="text-muted-foreground text-sm">
              Please keep exact change ready. Amount: <span className="font-semibold text-primary">${totalAmount.toFixed(2)}</span>
            </p>
          </div>
        )}

        {/* Place Order Button */}
        <Button
          onClick={handlePlaceOrder}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-primary to-cafe-gold hover:from-primary/80 hover:to-cafe-gold/80 text-lg py-6"
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Processing...</span>
            </div>
          ) : (
            `Place Order - $${totalAmount.toFixed(2)}`
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentSection;
