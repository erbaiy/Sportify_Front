import Image from '../../assets/static-removebg-preview.png';


export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Event Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Image
          src="/placeholder.svg?height=400&width=800"
          alt="Sports Event"
          width={800}
          height={400}
          className="w-full object-cover"
        />
        
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Upcoming Sports Events</h2>
          <p className="text-gray-600 mb-6">
            Stay up-to-date with the latest sports events in your area. Our dashboard provides you with all the information you need to manage and track various sporting activities.
          </p>
          <Link 
            href="/dashboard/events" 
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            View All Events
          </Link>
        </div>
      </div>
    </div>
  )
}

