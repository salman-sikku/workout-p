import { getSinglePost } from "@/libs/firebase/post/read_server_post";
import Image from "next/image";
import DOMPurify from 'isomorphic-dompurify';

export default async function Page({ params }: any) {
    const { id } = params;
    const post = await getSinglePost(id);

    if (!post || typeof post.content !== 'string') {
        console.error('Post content is not valid:', post);
        return <div className="text-center font-semibold text-[#6B6B6B] mt-12 text-lg">Content is not available</div>;
    }

    // Sanitize the content
    const cleanContent = DOMPurify.sanitize(post.content);

    return (
        <div className='mx-auto max-w-[585px] border border-transparent'>
            <h2 className='leading-[40px] text-[32px] font-bold mt-8'>{post.tital}</h2>
            <p className="text-[20px] mt-[0.92em] mb-[24px] text-[#6B6B6B] leading-[24px]">The bench press arch refers to the deliberate extension and curvature o.</p>
            <div className="flex items-center">
                <div className="flex items-center">
                    <div className="relative rounded-full w-12 h-12">
                        <Image src={post.imageUrl}
                            layout="fill"
                            objectFit="cover"
                            className="object-cover rounded-full"
                            alt='fit-img'
                            priority />
                    </div>
                </div>
                <div className="ml-4">
                    <h5 className='text-sm font-medium mb-[2px]'>Mucle Mack</h5>
                    <h5 className='text-[13px]'>Posted on <span className="font-medium">{post.timestamp.toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span></h5>
                </div>
            </div>
            <figure className="relative w-full h-[350px] mt-10">
                <Image
                    src={post.imageUrl}
                    layout="fill"
                    objectFit="cover"
                    className="object-cover rounded-xl"
                    alt='fit-img'
                    priority
                />
            </figure>
            <div className="content-div mt-10 mb-14" dangerouslySetInnerHTML={{ __html: cleanContent }}></div>
        </div>
    );
}
