import React from 'react';
import { usePosts } from '@/libs/firebase/post/read';


function AllBlogsDisplay() {
    const { data, error, isLoading } = usePosts();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Timestamp</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((curElm:any, ) => (
                        <tr key={curElm.id}>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={curElm.imageUrl} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{curElm.tital.slice(0, 20)}...</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className="badge badge-ghost badge-sm">{curElm.id}</span>
                            </td>
                            <td>Purple</td>
                            <th>
                                <button className="btn btn-ghost btn-xs">details</button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AllBlogsDisplay;
