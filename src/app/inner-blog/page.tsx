import Image from "next/image"
import Link from "next/link"
import villa from '../../../public/villa.png';
import fb from '../../../public/facebook-icon.png'; 
import x from '../../../public/x.png';
import linked from '../../../public/linkedin-icon.png';
import agent from '../../../public/agent-img.png';
import call from '../../../public/call.png';
import star from '../../../public/star-glow.png';
interface AgentReview {
  name: string
  rating: number
  reviews: number
  comment: string
}

interface RelatedArticle {
  image: string
  category: string
  title: string
}

export default function Component() {
  const reviews: AgentReview[] = [
    {
      name: "Helen Zhang",
      rating: 4.9,
      reviews: 25,
      comment: "Excellent service from the very start. I got valuable advices in terms of deciding the best time to put the property..."
    },
    {
      name: "Helen Zhang",
      rating: 4.9,
      reviews: 25,
      comment: "Excellent service from the very start. I got valuable advices in terms of deciding the best time to put the property..."
    }
  ]

  const relatedArticles: RelatedArticle[] = [
    {
      image: "/beach-building.png",
      category: "Building",
      title: "Guiding you to your dream home with advanced AI and unmatched..."
    },
    {
      image: "/beach-house.png",
      category: "Building",
      title: "Guiding you to your dream home with advanced AI and unmatched..."
    },
    {
      image: "/beach-building.png",
      category: "Building",
      title: "Guiding you to your dream home with advanced AI and unmatched..."
    },
    {
      image: "/beach-house.png",
      category: "Building",
      title: "Guiding you to your dream home with advanced AI and unmatched..."
    }
  ]

  return (
    <div className="min-h-screen bg-white pt-7">
      {/* Hero Image */}
      <div className="relative h-[400px] w-full container mx-auto">
        <Image
          src={villa}
          alt="Modern house with pool"
          fill
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">
                Guiding You To Your Dream Home With Advanced AI And Unmatched Insight
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                <span>August 20, 2023</span>
                <span>Building</span>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose max-w-none">
              <h2 className='text-[22px] text-[#0B0B0B] leading-[22px] font-medium mb-4'>Introduction</h2>
              <p className='text-[#3A3A3A] text-[18px] leading-7 font-normal mb-7'>
                Hello there! As a homeowner, investor, or tenant, you&apos;re likely always looking for ways to make smarter decisions in the real estate market. Whether it&apos;s finding a new property, managing current investments, or optimizing property value, technology is transforming the way we navigate these complex landscapes. AI has become a powerful ally in this journey, offering insights that can streamline your decision-making and elevate your overall experience.
              </p>

              <h2 className='text-[22px] text-[#0B0B0B] leading-[22px] font-medium mb-4'>How AI is Revolutionizing the Real Estate Market</h2>
              <p className='text-[#3A3A3A] text-[18px] leading-7 font-normal mb-7'>
                Artificial intelligence is reshaping the way we approach real estate, offering tools that provide valuable insights, predictive analytics, and personalized recommendations. From estimating property values to analyzing market trends, AI is making it easier to find properties that match your needs while avoiding common pitfalls.
              </p>
              <p className='text-[#3A3A3A] text-[18px] leading-7 font-normal mb-7'>
                AI doesn&apos;t just gather data; it interprets it to give you actionable insights, like which neighborhoods are expected to rise in value or where rent demand is surging. By integrating AI into the real estate journey, you can approach buying, selling, or managing properties with confidence, armed with the knowledge that you&apos;re making well-informed decisions.
              </p>

              <h2 className='text-[22px] text-[#0B0B0B] leading-[22px] font-medium mb-4'>Personalized Property Searches Tailored to You</h2>
              <p className='text-[#3A3A3A] text-[18px] leading-7 font-normal mb-7'>
                Imagine a system that understands your unique preferences, from property size and location to amenities and neighborhood characteristics. Advanced AI tools analyze vast amounts of data to match you with the perfect properties, reducing the time spent sifting through irrelevant listings and bringing you closer to your dream home faster.
              </p>

              <h2 className='text-[22px] text-[#0B0B0B] leading-[22px] font-medium mb-4'>Streamlining Property Management with Smart Analytics</h2>
              <p className='text-[#3A3A3A] text-[18px] leading-7 font-normal mb-7'>
                For property owners and property managers, AI offers solutions that simplify property management. From rent forecasting and expense tracking to maintenance scheduling, AI-powered tools help optimize operations, reduce costs, and ensure you&apos;re maximizing the value of your investment.
              </p>
              <p className='text-[#3A3A3A] text-[18px] leading-7 font-normal mb-7'>
                By automating routine tasks, AI enables you to focus on higher-value activities, like building tenant relationships or expanding your portfolio. This level of operational support can be a game-changer for anyone involved in property management, from first-time landlords to seasoned investors managing multiple properties.
              </p>

              <h2 className='text-[22px] text-[#0B0B0B] leading-[22px] font-medium mb-4'>Enhanced Market Insight for Better Decision-Making</h2>
              <p className='text-[#3A3A3A] text-[18px] leading-7 font-normal mb-7'>
                AI doesn&apos;t just help you search – it provides comprehensive insights into market trends and future projections. Understanding where the market is headed can give you a significant advantage, whether you&apos;re buying, selling, or holding onto a property. With AI, you gain access to data-driven insights that go beyond what traditional methods can offer, helping you make decisions with confidence.
              </p>

              <h2 className='text-[22px] text-[#0B0B0B] leading-[22px] font-medium mb-4'>Avoiding Common Real Estate Pitfalls with AI</h2>
              <p className='text-[#3A3A3A] text-[18px] leading-7 font-normal mb-7'>
                The real estate market can be complex and sometimes unpredictable. AI helps you navigate this landscape by flagging potential red flags, such as overvalued properties or unfavorable locations. By relying on data and predictive analysis, AI can help you make decisions with confidence, minimizing the risks associated with real estate investments.
              </p>

              <h2 className='text-[22px] text-[#0B0B0B] leading-[22px] font-medium mb-4'>Journey to Finding the Perfect Property</h2>
              <p className='text-[#3A3A3A] text-[18px] leading-7 font-normal mb-7'>
                Whether you&apos;re a first-time homebuyer, an experienced investor, or managing multiple properties, AI is here to guide you with unmatched precision and insight. Embrace the future of real estate, and let technology lead you to the property that fits your lifestyle, goals, and dreams.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-3 md:space-y-16">
            {/* Social Share */}
            <div className="mb-6 ">
              <button
                className="w-full font-semibold text-[16px] px-4 py-2 md:px-[75px] md:py-[28px] rounded-lg bg-[#1E184F] text-white hover:bg-[#1e1752] flex flex-col items-center justify-center gap-3"
              >
                Share with your community!
                <div className="flex items-center gap-2 ml-2">
                  <Image src={fb} alt='' className='w-7 h-7'/>
                  <Image src={x} alt='' className='w-7 h-7'/>
                  <Image src={linked} alt='' className='w-7 h-7'/>

                </div>
              </button>
            </div>

            {/* Table of Contents */}
            <div className="bg-[#FDE6F4] rounded-[10px] p-6 ">
              <h2 className="text-xl font-semibold mb-4 text-[#EF2BA0] border-l-[3px] px-1 border-l-[#EF2BA0]">Introduction</h2>
              <ul className="space-y-3 px-3">
                <li>
                  <Link href="#" className="text-[#0B0B0B] font-medium text-[20px] leading-[24px] hover:text-pink-500">
                    How AI is Revolutionizing the Real Estate Market
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#0B0B0B] font-medium text-[20px] leading-[24px] hover:text-pink-500">
                    Personalized Property Searches Tailored to You
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#0B0B0B] font-medium text-[20px] leading-[24px] hover:text-pink-500">
                    Stream Property Management with Smart Analytics
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#0B0B0B] font-medium text-[20px] leading-[24px] hover:text-pink-500">
                    Enhanced Market Insight for Better Decision-Making
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#0B0B0B] font-medium text-[20px] leading-[24px] hover:text-pink-500">
                    Avoiding Common Real Estate Pitfalls with AI
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#0B0B0B] font-medium text-[20px] leading-[24px] hover:text-pink-500">
                    Journey to Finding the Perfect Property
                  </Link>
                </li>
              </ul>
            </div>

            {/* Agent Reviews */}
            
            {reviews.map((review, index) => (
              <div key={index} className="bg-white rounded-[20px] border border-[#A3A0B7]">
                <div className='p-5'>
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={agent}
                    alt={review.name}
                    width={66}
                    height={66}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-[22px] leading-[26.5px] mb-3">{review.name}</h3>
                    <div className="flex items-center gap-1">
                      <Image src={star} alt=''/>
                      <span className="font-medium">{review.rating}</span>
                      <span className="text-[#3A3A3A]">({review.reviews} Reviews)</span>
                    </div>
                  </div>
                </div>
                <p className="text-[#3A3A3A] text-[18px] leading-[30px] mb-6">
                  {review.comment}
                  <button className="text-pink-500 font-medium ml-1">Read More</button>
                </p>
                <div className="flex items-center gap-3 mb-6">
                  <button className="flex-1 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-50">
                    Content Agent
                  </button>
                  <button className="h-11 w-11 rounded-full bg-[#FDE6F4] hover:bg-pink-600 flex items-center justify-center">
                   <Image src={call} alt=''/>
                  </button>
                </div>
              
              </div>
                <div className="py-4 text-[22px] text-[#443F6D]  text-center bg-[#E9E8ED]  overflow-hidden rounded-b-[20px]">
                UOL Group Limited
              </div>
              </div>
            ))}
          
          </div>
        </div>

        {/* Related Articles */}
        <div className="mb-12   ">
          <h2 className="text-[24px] font-semibold mb-[50px]">Related Articles</h2>
          <div className="flex flex-nowrap justify-between overflow-x-auto gap-2 pb-4">
            {relatedArticles.map((article, index) => (
              <div key={index} className="flex-none w-[335px] group border rounded-[10px]">
                <div className="relative h-[200px] mb-4 rounded-t-[10px]  overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-2  p-4">
                  <div className="text-[18px] text-[#3A3A3A]">
                    <span>{article.category}</span>
                  </div>
                  <div className="text-[#3A3A3A] text-[12px]">August 20, 2023</div>
                  <h3 className="font-normal text-[16px] text-[#3A3A3A]">
                    {article.title}
                    <button className="text-[#EF2BA0] ml-1 text-sm">Read More</button>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comment Form */}
        <div className="container border rounded-[50px] md:max-w-3xl lg:max-w-3xl w-full m-auto md:p-[100px] lg:p-[100px] p-4">
          <h2 className="text-[24px] font-medium mb-6 text-[#0B0B0B]">Leave A Comment</h2>
          <form className="space-y-4 container">
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Name" className="w-full text-[#A3A0B7] px-4 py-2 rounded-full border border-[#7D7999]" />
              <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded-full text-[#7D7999] border border-[#7D7999]" />
            </div>
            <textarea
              placeholder="Write your comment"
              className="w-full px-4 py-2 rounded-3xl border border-[#7D7999] min-h-[150px] resize-none"
            ></textarea>
            <div className="text-right">
              <button type="submit" className="px-12 py-3 rounded-full bg-[#EF2BA0] hover:bg-pink-600 text-white">
                POST A COMMENT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}