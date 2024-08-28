import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { createNewBlog } from "@/libs/firebase/post/write";
import TextEditor from "./TextEditor";

interface BlogData {
    tital?: string;
    slug?: string;
    [key: string]: any;
}

function CreateBlogPost() {
    const [data, setData] = useState<BlogData>({});
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState<string>('');
    const [isDone, setIsDone] = useState<boolean>(false);
    console.log(data);

    const handleData = (key: string, value: any) => {
        setData({
            ...data,
            [key]: value
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createNewBlog({ data: data, image: image });
            setIsDone(true);
        } catch (error) {
            console.log(error);
            setError('Failed to create blog post');
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    return (
        <>
            <div className="p-8 bg-[#f0ecff] rounded-xl">
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md">
                    <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700">Title</label>
                        <input
                            type="text"
                            name="Enter title"
                            onChange={(e) => handleData('tital', e.target.value)}
                            value={data?.tital || ''}
                            placeholder="Title"
                            required
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Slug</label>
                        <input
                            type="text"
                            name="Enter slug"
                            onChange={(e) => handleData('slug', e.target.value)}
                            value={data?.slug || ''}
                            placeholder="Slug"
                            required
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    {image && (
                        <div className="mb-4">
                            <Image src={URL.createObjectURL(image)} width={150} height={150} alt="Uploaded image" />
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block text-gray-700">Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            name="Enter image"
                            onChange={handleImageChange}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <TextEditor  data={data} handleData={handleData} />
                    <button type="submit" className="btn">{isDone ? "Done" : "Create post"}</button>
                </form>
            </div>
        </>
    );
}

export default CreateBlogPost;
