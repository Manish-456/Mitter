import Header from "@/components/Header";
import Form from "./Form";
import PostFeed from "@/components/Posts/PostFeed";


export default function Home() {

  return (
<>

 <Header  label="Home" />
 <Form placeholder="What's on your mind?" />
 <PostFeed  />
</>
  )
}
