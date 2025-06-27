
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Plus, CreditCard, Coffee } from "lucide-react";
import AddressForm from "@/components/AddressForm";
import PaymentSection from "@/components/PaymentSection";

const Checkout = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      street: "123 Coffee Street",
      city: "Bean City",
      state: "CA",
      zipCode: "90210",
      isDefault: true
    },
    {
      id: 2,
      name: "Office",
      street: "456 Work Avenue",
      city: "Business District",
      state: "CA",
      zipCode: "90211",
      isDefault: false
    }
  ]);

  const [cartItems] = useState([
    { id: 1, name: "Midnight Espresso", price: 4.50, quantity: 2 },
    { id: 2, name: "Bloom Latte", price: 5.25, quantity: 1 },
    { id: 3, name: "Dark Roast Coffee", price: 3.75, quantity: 1 }
  ]);

  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleAddAddress = (newAddress) => {
    const address = {
      ...newAddress,
      id: addresses.length + 1,
      isDefault: addresses.length === 0
    };
    setAddresses([...addresses, address]);
    setShowAddressForm(false);
    setSelectedAddress(address);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-slate-950 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Coffee className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-cafe-gold bg-clip-text text-transparent">
              Checkout
            </h1>
          </div>
          <p className="text-muted-foreground">Complete your order from Midnight Cafe Bloom</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Address Selection */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Delivery Address</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedAddress?.id === address.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedAddress(address)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-foreground">{address.name}</h3>
                          {address.isDefault && (
                            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm mt-1">
                          {address.street}, {address.city}, {address.state} {address.zipCode}
                        </p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        selectedAddress?.id === address.id
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground'
                      }`} />
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="w-full border-dashed border-primary/30 text-primary hover:bg-primary/10"
                  onClick={() => setShowAddressForm(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Address
                </Button>

                {showAddressForm && (
                  <div className="mt-6 p-6 border border-primary/20 rounded-lg bg-card/50">
                    <h3 className="text-lg font-semibold mb-4">Add New Address</h3>
                    <AddressForm
                      onSubmit={handleAddAddress}
                      onCancel={() => setShowAddressForm(false)}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Section */}
            <PaymentSection totalAmount={totalAmount} selectedAddress={selectedAddress} />
          </div>

          {/* Order Summary */}
          <div>
            <Card className="glass sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-primary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
                
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
