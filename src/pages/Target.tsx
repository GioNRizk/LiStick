import React, { useState, useEffect } from 'react';
import { Users, Target, Globe, TrendingUp, MapPin, Eye, Heart, Award, ArrowRight, Zap, Shield, Star, CheckCircle } from 'lucide-react';

const TargetMarketPage = () => {
  const [activeSegment, setActiveSegment] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const marketSegments = [
    {
      title: "Visually Impaired Youth & Adults",
      ageRange: "15-65 years",
      icon: Eye,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      description: "Tech-savvy individuals seeking independence and modern solutions",
      characteristics: ["Highly adaptable to new technology", "Active lifestyle", "Career-focused", "Socially connected"],
      needs: ["Advanced navigation tools", "Professional mobility solutions", "Independence in urban environments", "Reliable safety features"]
    },
    {
      title: "Elderly with Vision Loss",
      ageRange: "65+ years",
      icon: Heart,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      description: "Experienced individuals adapting to age-related vision changes",
      characteristics: ["Value reliability and simplicity", "Health-conscious", "Family-oriented", "Cautious adopters"],
      needs: ["Easy-to-use interfaces", "Health monitoring features", "Family connectivity", "Enhanced safety measures"]
    }
  ];

  const stats = [
    { number: "70,000", label: "Visually Impaired in Lebanon", icon: Users, color: "text-blue-600" },
    { number: "1,750", label: "Phase 1 Target Users", icon: Target, color: "text-green-600" },
    { number: "$175,000", label: "Revenue Goal", icon: TrendingUp, color: "text-purple-600" },
    { number: "5", label: "MENA Countries (Future)", icon: Globe, color: "text-orange-600" }
  ];

  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-teal-500 rounded-3xl mb-8 transform hover:scale-110 transition-transform duration-300 shadow-2xl">
              <Target className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
                Our Market
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed font-light">
              Empowering <span className="font-bold text-teal-400">70,000 visually impaired individuals</span> across Lebanon and beyond
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-8 py-4 text-white font-semibold">
                🇱🇧 Starting in Lebanon
              </div>
              <ArrowRight className="w-6 h-6 text-white/70 rotate-90 sm:rotate-0" />
              <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-full px-8 py-4 text-white font-semibold shadow-lg">
                🌍 Expanding to MENA
              </div>
            </div>

            <button className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-10 py-5 rounded-full font-bold text-lg hover:from-blue-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-2xl">
              Explore Our Impact
            </button>
          </div>
        </div>
      </section>

      {/* Market Statistics */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Market at a Glance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding our market size and opportunity across the region
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group relative">
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-gradient-to-br ${stat.color === 'text-blue-600' ? 'from-blue-500 to-blue-600' : stat.color === 'text-green-600' ? 'from-green-500 to-green-600' : stat.color === 'text-purple-600' ? 'from-purple-500 to-purple-600' : 'from-orange-500 to-orange-600'} group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className={`text-4xl font-black mb-3 ${stat.color}`}>
                      {stat.number}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Segments */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              Our Target Segments
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Two distinct groups with unique needs, united by our innovative solution
            </p>
          </div>

          {/* Segment Selector */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 rounded-full p-2 inline-flex">
              {marketSegments.map((segment, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSegment(index)}
                  className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeSegment === index
                      ? 'bg-white text-gray-900 shadow-lg'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {segment.ageRange}
                </button>
              ))}
            </div>
          </div>

          {/* Active Segment Display */}
          <div className="max-w-6xl mx-auto">
            {marketSegments.map((segment, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  activeSegment === index ? 'opacity-100 block' : 'opacity-0 hidden'
                }`}
              >
                <div className={`bg-gradient-to-br ${segment.bgColor} rounded-3xl p-8 md:p-12`}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${segment.color} rounded-3xl mb-6 shadow-lg`}>
                        <segment.icon className="w-10 h-10 text-white" />
                      </div>
                      
                      <h3 className="text-4xl font-bold mb-4 text-gray-900">
                        {segment.title}
                      </h3>
                      
                      <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                        {segment.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6">
                          <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                            <Users className="w-5 h-5 mr-2 text-blue-600" />
                            Characteristics
                          </h4>
                          <ul className="space-y-2">
                            {segment.characteristics.map((char, idx) => (
                              <li key={idx} className="flex items-start text-gray-700">
                                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                                <span className="text-sm">{char}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6">
                          <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                            <Zap className="w-5 h-5 mr-2 text-purple-600" />
                            Key Needs
                          </h4>
                          <ul className="space-y-2">
                            {segment.needs.map((need, idx) => (
                              <li key={idx} className="flex items-start text-gray-700">
                                <Star className="w-4 h-4 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
                                <span className="text-sm">{need}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="relative bg-white rounded-3xl p-8 shadow-xl">
                        <div className="text-center">
                          <div className={`w-32 h-32 mx-auto mb-6 bg-gradient-to-br ${segment.color} rounded-full flex items-center justify-center shadow-lg`}>
                            <segment.icon className="w-16 h-16 text-white" />
                          </div>
                          <h4 className="text-2xl font-bold mb-4">
                            Age Range: {segment.ageRange}
                          </h4>
                          <div className="bg-gray-50 rounded-2xl p-6">
                            <div className="text-3xl font-bold text-gray-900 mb-2">
                              {index === 0 ? '85%' : '15%'}
                            </div>
                            <div className="text-gray-600">
                              of our target market
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Floating elements */}
                      <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce delay-1000"></div>
                      <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full animate-bounce delay-2000"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Geographic Expansion */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              Geographic Expansion Strategy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Lebanon to the entire MENA region - our roadmap to impact
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl border-l-4 border-green-500">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Phase 1: Lebanon Focus</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Establishing our presence in urban Lebanese markets, targeting 1,750 users from the 70,000 visually impaired population.
                </p>
                <div className="flex items-center text-green-600 font-semibold">
                  <MapPin className="w-5 h-5 mr-2" />
                  Beirut, Tripoli, Sidon, Tyre
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border-l-4 border-blue-500">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Phase 2: MENA Expansion</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Scaling across the Middle East and North Africa, reaching 5 countries with localized solutions.
                </p>
                <div className="flex items-center text-blue-600 font-semibold">
                  <Globe className="w-5 h-5 mr-2" />
                  UAE, Jordan, Egypt, Morocco, Tunisia
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
                <h3 className="text-3xl font-bold mb-8 text-center">Market Potential</h3>
                
                <div className="space-y-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Lebanon Market</span>
                      <span className="text-2xl font-bold">70K</span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-3">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full w-[25%]"></div>
                    </div>
                    <p className="text-sm mt-2 opacity-90">Current phase target: 2.5%</p>
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">MENA Region</span>
                      <span className="text-2xl font-bold">5M+</span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-3">
                      <div className="bg-gradient-to-r from-green-400 to-blue-400 h-3 rounded-full w-[70%]"></div>
                    </div>
                    <p className="text-sm mt-2 opacity-90">Expansion opportunity</p>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <div className="text-4xl font-bold mb-2">$175K</div>
                  <div className="text-lg opacity-90">Phase 1 Revenue Target</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Transform Lives?
          </h2>
          <p className="text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join us in creating a more accessible world for 70,000+ individuals across the MENA region
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="bg-white text-blue-600 px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl">
              Partner With Us
            </button>
            <button className="border-2 border-white text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300">
              View Our Impact
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TargetMarketPage;