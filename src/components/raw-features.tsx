import { FaLink, FaBolt, FaBrain, FaAward, FaGlobe, FaShieldAlt } from "react-icons/fa"

const features = [
  {
    icon: <FaLink />,
    title: "Immutable Transaction Records",
    description: "Every subsidy transaction recorded on blockchain with complete audit trail and public verification",
    color: "text-electric-green",
  },
  {
    icon: <FaBolt />,
    title: "Milestone-Based Auto-Release",
    description: "Intelligent contracts automatically release funds upon verified milestone completion",
    color: "text-gold",
  },
  {
    icon: <FaBrain />,
    title: "Predictive Risk Assessment",
    description: "Advanced machine learning algorithms assess project viability and fraud probability in real-time",
    color: "text-teal",
  },
  {
    icon: <FaAward />,
    title: "Tokenized Impact Verification",
    description: "Blockchain-native certificates proving authentic green hydrogen production and environmental impact",
    color: "text-electric-green",
  },
  {
    icon: <FaGlobe />,
    title: "Real-Time Market Insights",
    description: "Live regional mapping, price intelligence, and market dynamics across 50+ countries",
    color: "text-emerald",
  },
  {
    icon: <FaShieldAlt />,
    title: "Bank-Grade Protection",
    description: "Multi-layer security with insurance marketplace integration and comprehensive risk coverage",
    color: "text-gold",
  },
]

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-12">The TrustChain Advantage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800 p-8 rounded-lg border border-gray-700 transition-transform transform hover:scale-105 hover:border-electric-green"
            >
              <div className={`text-5xl ${feature.color} mb-4 inline-block`}>{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <button className="bg-transparent border-2 border-electric-green text-electric-green font-bold py-3 px-8 rounded-lg text-lg hover:bg-electric-green hover:text-gray-900 transition-colors">
            Explore Platform
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
