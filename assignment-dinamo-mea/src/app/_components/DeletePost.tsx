'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { Button, message } from 'antd';

interface DeletePostProps {
    id: number | undefined; 
    onDelete: (id: number | undefined) => void; 
}

const DeletePost: React.FC<DeletePostProps> = ({ id, onDelete }) => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
           
            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
            message.success('Post deleted successfully');
            onDelete(id); 
        } catch {
            message.error('Failed to delete post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            type="primary"
            danger
            onClick={handleDelete}
            loading={loading}
        >
            Delete
        </Button>
    );
};
export default DeletePost;