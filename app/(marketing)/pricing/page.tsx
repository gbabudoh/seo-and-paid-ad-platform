export default function PricingPage() {
  const packages = [
    {
      name: 'Bronze',
      price: '$499',
      description: 'Perfect for small businesses getting started',
      features: [
        'Basic SEO optimization',
        'Google Ads management',
        'Monthly reporting',
        'Email support',
      ],
    },
    {
      name: 'Silver',
      price: '$999',
      description: 'Ideal for growing businesses',
      features: [
        'Advanced SEO + Content',
        'Google Ads + Meta Ads',
        'Bi-weekly reporting',
        'Priority support',
      ],
    },
    {
      name: 'Gold',
      price: '$1999',
      description: 'For established businesses',
      features: [
        'Full SEO + GEO optimization',
        'All paid ad platforms',
        'Weekly reporting',
        'Dedicated account manager',
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Pricing Plans</h1>
        <p className="mt-4 text-lg text-gray-600">
          Choose the plan that fits your business needs
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {packages.map((pkg) => (
          <div key={pkg.name} className="rounded-lg border border-gray-300 p-8">
            <h3 className="text-2xl font-bold">{pkg.name}</h3>
            <div className="mt-4">
              <span className="text-4xl font-bold">{pkg.price}</span>
              <span className="text-gray-600">/month</span>
            </div>
            <p className="mt-4 text-gray-600">{pkg.description}</p>
            <ul className="mt-6 space-y-2">
              {pkg.features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button className="mt-8 w-full cursor-pointer rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500">
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

