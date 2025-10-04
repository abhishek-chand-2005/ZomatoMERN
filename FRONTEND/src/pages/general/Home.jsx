import React, { useEffect, useRef } from 'react'
import '../../styles/reels.css'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

// Tiny contract:
// - Inputs: an array of video entries (src, description, storeUrl)
// - Output: full-screen vertically scrollable reels with snapping
// - Error modes: missing video src -> shows blank background

// const sampleVideos = [
//   {
//     id: 1,
//     // Using an online sample so the UI works out-of-the-box. Replace with a local asset if desired.
//     src: 'https://cdn.pixabay.com/video/2022/07/24/125314-733046618_large.mp4',
//     description: "Delicious biryani with aromatic spices and tender meat — a must try from our featured partner!",
//     storeUrl: '/store/1'
//   },
//   {
//     id: 2,
//     src: 'https://cdn.pixabay.com/video/2023/02/17/151109-800210380_large.mp4',
//     description: "Freshly made paneer tikka, served hot with tangy chutney. Limited time offer.",
//     storeUrl: '/store/2'
//   },
//   {
//     id: 3,
//     src: 'https://cdn.pixabay.com/video/2023/02/16/150959-799711748_large.mp4',
//     description: "Satisfy your sweet tooth with our signature gulab jamun — melt-in-mouth goodness.",
//     storeUrl: '/store/3'
//   }
// ]

const Home = () => {
  const [ videos, setVideos ] = useState([])
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const videos = container.querySelectorAll('video')

    // Play the first visible video and pause others using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (entry.intersectionRatio >= 0.6) {
            // play when at least 60% visible
            video.play().catch(() => {})
            // mute to avoid autoplay blocking in some browsers
            video.muted = true
          } else {
            video.pause()
          }
        })
      },
      { threshold: [0.25, 0.5, 0.6, 0.75, 1] }
    )

    videos.forEach((v) => observer.observe(v))

    // Ensure the initial video is played
    const first = videos[0]
    if (first) {
      first.currentTime = 0
      first.play().catch(() => {})
      first.muted = true
    }

    return () => observer.disconnect()
  }, [])

   useEffect(() => {
        axios.get("http://localhost:3000/api/food", { withCredentials: true })
            .then(response => {

                console.log(response.data);

                setVideos(response.data.foodItems)
            })
            .catch(() => { /* noop: optionally handle error */ })
    }, [])


  return (
    <div className="reels-root">
      <div className="reels-container" ref={setVideos(item._id)}>
        {sampleVideos.map((item) => (
          <section className="reel" key={item._id}>
            <video
              className="reel-video"
              src={item.src}
              playsInline
              loop
              preload="metadata"
            />

            <div className="reel-overlay">
              <div className="reel-meta">
                <p className="reel-description">{item.description}</p>
                <a className="reel-cta" href={item.storeUrl}>Visit Store</a>
                <Link className='reel-cta' to={'/food-partner/' + item.foodPartner}>Visit Store</Link>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default Home
