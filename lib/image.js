import Image from 'next/image'
import {useState} from 'react'


const MyImage = (props) => {
  const [data, setData] = useState(0)
  /*
  setInterval(function() {
    if(data==0){
      setData(1)
    }else{
      setData(0)
    }
  }, 2000);
  */
  
  const myLoader = ({ src, width, quality }) => {
    const srcs = ["http://localhost:8000/media/2022/05/06/FB_IMG_16501299543583160.jpg","http://localhost:8000/media/2022/05/06/FB_IMG_16398052406525868.jpg"]
    return `${srcs[data]}?w=${width}&q=${100}`
  }
  return (
    <Image
      loader={myLoader}
      src="me.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  )
}
export default MyImage;