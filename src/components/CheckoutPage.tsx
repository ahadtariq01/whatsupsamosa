import { useState, useEffect, FormEvent } from 'react';
import { CartItem, OrderDetails } from '../types';

interface CheckoutPageProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onClearCart: () => void;
  setActiveTab: (tab: 'Home' | 'Menu' | 'Checkout') => void;
}

export default function CheckoutPage({
  cart,
  onUpdateQuantity,
  onClearCart,
  setActiveTab,
}: CheckoutPageProps) {
  // Form State
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');

  // Form validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [isPlacing, setIsPlacing] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderStep, setOrderStep] = useState(0); 

  // Compute values
  const subtotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 150 : 0;
  const taxesAndCharges = subtotal > 0 ? Number((subtotal * 0.05).toFixed(2)) : 0;
  const grandTotal = subtotal + deliveryFee + taxesAndCharges;

  // Track mock delivery progress step-by-step
  useEffect(() => {
    if (orderSuccess && orderStep < 3) {
      const timer = setTimeout(() => {
        setOrderStep(prev => prev + 1);
      }, 7000); 
      return () => clearTimeout(timer);
    }
  }, [orderSuccess, orderStep]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(phoneNumber.trim())) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    if (!deliveryAddress.trim()) newErrors.deliveryAddress = 'Delivery Address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsPlacing(true);

    const emailjs = (window as any).emailjs;

    // Cart items ko string mein convert karna taake email mein display ho sakein
    const orderItemsString = cart.map(item => `${item.quantity}x ${item.menuItem.name}`).join(', ');

    // Template variables (ye sab EmailJS dashboard ke sath match karne chahiye)
    const templateParams = {
      customer_name: fullName,
      customer_phone: phoneNumber,
      customer_address: deliveryAddress,
      delivery_notes: deliveryNotes,
      order_details: `Items: ${orderItemsString} | Payment: ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online'} | Total Bill: Rs ${grandTotal}`,
      email: "ahadtariq616@gmail.com", // Aapka apna email address
      name: fullName // Customer ka naam (dashboard variables ke liye)
    };

    // EmailJS Send Request
    // Note: Yahan 'x0relpn' Template ID use ki gayi hai jo aapke screenshot mein thi
    emailjs.send('service_ozigr0m', 'template_mc7yaar', templateParams, 'qcG4Z7BmGHlbVFdfQ')
      .then(() => {
        const generatedId = `WUS-${Math.floor(100000 + Math.random() * 900000)}`;
        setOrderId(generatedId);
        setIsPlacing(false);
        setOrderSuccess(true);
      })
      .catch((error: any) => {
        console.error('EmailJS Error:', error);
        alert('Failed to send order. Please try again.');
        setIsPlacing(false);
      });
  };

  const handleReset = () => {
    onClearCart();
    setOrderSuccess(false);
    setOrderStep(0);
    setActiveTab('Home');
  };

  if (orderSuccess) {
    const arrivalTime = new Date();
    arrivalTime.setMinutes(arrivalTime.getMinutes() + 30);
    const formattedTime = arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
      <div className="max-w-3xl mx-auto py-12 px-4 text-center space-y-8 animate-in zoom-in-95 duration-300">
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-container text-on-primary-container shadow-lg animate-bounce">
            <span className="material-symbols-outlined text-4xl font-extrabold">check</span>
          </div>
          <h1 className="font-display text-4xl font-extrabold text-on-surface">Order Placed Successfully!</h1>
          <p className="text-body-md text-on-surface-variant max-w-md mx-auto">
            Get ready for crispy satisfaction. Your order <span className="font-bold text-secondary">{orderId}</span> is now confirmed and being prepared!
          </p>
        </div>

        <div className="bg-surface-container-low p-6 md:p-8 rounded-2xl border-2 border-primary-container/40 space-y-6 shadow-md text-left">
          <div className="flex justify-between items-center border-b border-outline-variant pb-4">
            <div>
              <span className="text-xs text-on-surface-variant uppercase tracking-wider font-bold">Estimated Arrival</span>
              <p className="font-display text-xl font-extrabold text-secondary">{formattedTime} (Approx 30 mins)</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-on-surface-variant uppercase tracking-wider font-bold">Status</span>
              <p className="font-display text-sm font-extrabold text-primary uppercase">
                {orderStep === 0 && 'Order Received'}
                {orderStep === 1 && 'Samosas Baking / Frying'}
                {orderStep === 2 && 'Out for Quick Delivery'}
                {orderStep === 3 && 'Arrived Hot & Fresh!'}
              </p>
            </div>
          </div>

          <div className="relative pt-4">
            <div className="absolute top-[26px] inset-x-4 h-1.5 bg-outline-variant rounded-full -z-0">
              <div 
                className="h-full bg-secondary rounded-full transition-all duration-1000"
                style={{ width: `${(orderStep / 3) * 100}%` }}
              ></div>
            </div>

            <div className="relative z-10 flex justify-between">
              <div className="flex flex-col items-center space-y-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold text-xs transition-colors duration-500 ${
                  orderStep >= 0 
                    ? 'bg-secondary border-secondary text-white' 
                    : 'bg-white border-outline-variant text-on-surface-variant'
                }`}>
                  <span className="material-symbols-outlined text-sm font-bold">receipt</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wide text-on-surface text-center">Received</span>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold text-xs transition-colors duration-500 ${
                  orderStep >= 1 
                    ? 'bg-secondary border-secondary text-white animate-pulse' 
                    : 'bg-white border-outline-variant text-on-surface-variant'
                }`}>
                  <span className="material-symbols-outlined text-sm font-bold">local_fire_department</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wide text-on-surface text-center">Baking</span>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold text-xs transition-colors duration-500 ${
                  orderStep >= 2 
                    ? 'bg-secondary border-secondary text-white' 
                    : 'bg-white border-outline-variant text-on-surface-variant'
                }`}>
                  <span className="material-symbols-outlined text-sm font-bold">local_shipping</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wide text-on-surface text-center">Delivering</span>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold text-xs transition-colors duration-500 ${
                  orderStep >= 3 
                    ? 'bg-primary-container border-primary text-on-primary-container' 
                    : 'bg-white border-outline-variant text-on-surface-variant'
                }`}>
                  <span className="material-symbols-outlined text-sm font-bold">home_pin</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wide text-on-surface text-center">Arrived</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-outline-variant text-left space-y-4">
          <h3 className="font-display font-extrabold text-lg text-on-surface border-b border-outline-variant pb-2">
            Delivery Summary
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs text-on-surface-variant">
            <div>
              <p className="font-bold text-on-surface uppercase">Full Name</p>
              <p>{fullName}</p>
            </div>
            <div>
              <p className="font-bold text-on-surface uppercase">Phone Number</p>
              <p>{phoneNumber}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="font-bold text-on-surface uppercase">Address</p>
              <p>{deliveryAddress}</p>
            </div>
            {deliveryNotes && (
              <div className="sm:col-span-2">
                <p className="font-bold text-on-surface uppercase">Instructions</p>
                <p>{deliveryNotes}</p>
              </div>
            )}
            <div>
              <p className="font-bold text-on-surface uppercase">Payment Mode</p>
              <p className="capitalize font-bold text-secondary">{paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</p>
            </div>
            <div>
              <p className="font-bold text-on-surface uppercase">Total Paid</p>
              <p className="font-display text-sm font-black text-secondary">Rs {grandTotal}</p>
            </div>
          </div>
        </div>

        <button 
          onClick={handleReset}
          className="bg-primary hover:bg-primary-container hover:text-on-primary-container text-white font-bold py-4 px-8 rounded-xl transition-all cursor-pointer shadow-md"
        >
          Back to Home Page
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center space-y-6 animate-in fade-in duration-300">
        <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center mx-auto text-primary">
          <span className="material-symbols-outlined text-4xl font-bold">shopping_cart_off</span>
        </div>
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-extrabold text-on-surface">Your Cart is Empty</h2>
          <p className="text-sm text-on-surface-variant font-sans">
            You must add at least one item to your cart before you can check out.
          </p>
        </div>
        <button 
          onClick={() => setActiveTab('Menu')}
          className="bg-secondary hover:bg-secondary-container text-white font-bold py-3 px-6 rounded-lg transition-all cursor-pointer shadow-md uppercase text-xs tracking-wider"
        >
          View Our Menu
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="space-y-1">
        <h1 className="font-display text-3xl md:text-4xl font-extrabold text-on-surface">Complete Your Order</h1>
        <p className="text-sm text-on-surface-variant font-sans">Spicy samosas are just a few details away.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div className="lg:col-span-7 space-y-6">
          
          <form onSubmit={handlePlaceOrder} className="bg-white p-6 md:p-8 rounded-2xl border border-outline-variant space-y-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-outline-variant/60 pb-4">
              <span className="material-symbols-outlined text-primary font-bold text-2xl">local_shipping</span>
              <h2 className="font-display text-xl font-extrabold text-on-surface">Delivery Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Full Name</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. john Will" 
                  name="customer_name"
                  className={`w-full h-11 px-4 rounded-lg border-2 ${
                    errors.fullName ? 'border-secondary' : 'border-outline-variant'
                  } bg-surface-bright font-sans text-sm focus:border-primary focus:ring-0 transition-all outline-none`}
                />
                {errors.fullName && (
                  <p className="text-[10px] font-bold text-secondary">{errors.fullName}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Phone Number</label>
                <input 
                  type="tel" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="030******01" 
                  name="customer_phone"
                  className={`w-full h-11 px-4 rounded-lg border-2 ${
                    errors.phoneNumber ? 'border-secondary' : 'border-outline-variant'
                  } bg-surface-bright font-sans text-sm focus:border-primary focus:ring-0 transition-all outline-none`}
                />
                {errors.phoneNumber && (
                  <p className="text-[10px] font-bold text-secondary">{errors.phoneNumber}</p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Delivery Address</label>
              <textarea 
                rows={3} 
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Apartment, Street, Landmark..."
                name="customer_address" 
                className={`w-full p-3 rounded-lg border-2 ${
                  errors.deliveryAddress ? 'border-secondary' : 'border-outline-variant'
                } bg-surface-bright font-sans text-sm focus:border-primary focus:ring-0 transition-all outline-none`}
              />
              {errors.deliveryAddress && (
                <p className="text-[10px] font-bold text-secondary">{errors.deliveryAddress}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Delivery Notes (Optional)</label>
              <input 
                type="text" 
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                placeholder="e.g. Ring the bell twice, near the mosque"
                name="order_details" 
                className="w-full h-11 px-4 rounded-lg border-2 border-outline-variant bg-surface-bright font-sans text-sm focus:border-primary focus:ring-0 transition-all outline-none"
              />
            </div>
          </form>

          <div className="bg-white p-6 md:p-8 rounded-2xl border border-outline-variant space-y-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-outline-variant/60 pb-4">
              <span className="material-symbols-outlined text-primary font-bold text-2xl">payments</span>
              <h2 className="font-display text-xl font-extrabold text-on-surface">Payment Method</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label 
                className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'cod' 
                    ? 'border-primary bg-primary-fixed/20 shadow-sm' 
                    : 'border-outline-variant bg-white hover:border-primary/50'
                }`}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  checked={paymentMethod === 'cod'} 
                  onChange={() => setPaymentMethod('cod')} 
                  className="hidden" 
                />
                <div className="flex items-center gap-4">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'cod' ? 'border-primary' : 'border-outline-variant'
                  }`}>
                    {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                  </div>
                  <div>
                    <p className="font-display font-extrabold text-sm text-on-primary-fixed">Cash on Delivery</p>
                    <p className="text-[11px] text-on-primary-fixed-variant opacity-80 font-sans">Pay when you receive</p>
                  </div>
                </div>
              </label>

              <label 
                className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'online' 
                    ? 'border-primary bg-primary-fixed/20 shadow-sm' 
                    : 'border-outline-variant bg-white hover:border-primary/50'
                }`}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  checked={paymentMethod === 'online'} 
                  onChange={() => setPaymentMethod('online')} 
                  className="hidden" 
                />
                <div className="flex items-center gap-4">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'online' ? 'border-primary' : 'border-outline-variant'
                  }`}>
                    {paymentMethod === 'online' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                  </div>
                  <div>
                    <p className="font-display font-extrabold text-sm text-on-surface">Online Payment</p>
                    <p className="text-[11px] text-on-surface-variant opacity-80 font-sans">UPI, Cards, Netbanking</p>
                  </div>
                </div>
              </label>
            </div>
          </div>

        </div>

        <aside className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          <div className="bg-on-primary-fixed text-primary-fixed p-6 md:p-8 rounded-2xl shadow-xl border-t-8 border-primary-container relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-28 h-28 bg-primary-container/10 rounded-full blur-2xl"></div>

            <h2 className="font-display text-xl font-extrabold mb-6 flex items-center gap-2">
              Order Summary
              <span className="text-xs bg-primary-container text-on-primary-container px-2.5 py-1 rounded font-bold uppercase tracking-wider">
                {cart.reduce((s, i) => s + i.quantity, 0)} Items
              </span>
            </h2>

            <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2 border-b border-primary-fixed/20 pb-5">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-start gap-4 text-xs font-sans">
                  <div className="flex gap-3">
                    <img 
                      src={item.menuItem.image} 
                      alt={item.menuItem.name}
                      className="w-12 h-12 rounded-lg object-cover border border-primary-fixed/10 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="font-bold text-sm text-white">{item.quantity}x {item.menuItem.name}</p>
                      <p className="text-[10px] opacity-70 italic line-clamp-1">{item.notes}</p>
                    </div>
                  </div>
                  <span className="font-display font-extrabold text-sm text-white">Rs {item.menuItem.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 py-5 border-b border-primary-fixed/20 font-sans text-xs">
              <div className="flex justify-between">
                <span className="opacity-80">Subtotal</span>
                <span>Rs {subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-80">Delivery Fee</span>
                <span>Rs {deliveryFee}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-5">
              <span className="font-display text-lg font-extrabold text-white">Grand Total</span>
              <span className="font-display text-3xl font-black text-primary-container">Rs {grandTotal}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isPlacing}
              className={`w-full mt-8 bg-secondary hover:bg-secondary-container text-white py-4 rounded-xl font-display font-extrabold text-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:translate-y-[-2px] ${
                isPlacing ? 'opacity-80 cursor-not-allowed' : ''
              }`}
            >
              {isPlacing ? (
                <>
                  <span>Placing Order...</span>
                  <span className="animate-spin material-symbols-outlined text-lg">progress_activity</span>
                </>
              ) : (
                <>
                  <span>Place Order</span>
                  <span className="material-symbols-outlined font-bold">arrow_forward</span>
                </>
              )}
            </button>
            <p className="text-center text-[10px] opacity-50 mt-4 italic">Spicy &amp; Fresh, delivered in 30 mins.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2.5 text-on-surface-variant p-4 bg-surface-container rounded-xl border border-outline-variant/40">
              <span className="material-symbols-outlined text-tertiary text-2xl font-bold">verified_user</span>
              <div>
                <p className="font-display font-bold text-[11px] uppercase tracking-wide text-on-surface">Secure Checkout</p>
                <p className="text-[9px] font-sans">Guaranteed safety</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-on-surface-variant p-4 bg-surface-container rounded-xl border border-outline-variant/40">
              <span className="material-symbols-outlined text-secondary text-2xl font-bold">eco</span>
              <div>
                <p className="font-display font-bold text-[11px] uppercase tracking-wide text-on-surface">Fresh Spices</p>
                <p className="text-[9px] font-sans">Handpicked daily</p>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}