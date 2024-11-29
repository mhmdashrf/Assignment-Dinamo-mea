import React, { useState } from 'react'
import { Post } from '../_interfaces/tyeps';
import axios from 'axios';
import { Button, Form, Input, message } from 'antd';
interface UpdatePostProps {
    post:Post;
    onUpdate:(uodatePost:Post)=>void;
    onCancel:()=>void;
}
function UpdatePost({post,onUpdate,onCancel}:UpdatePostProps) {
    const [loading,setLoading]=useState<boolean>(false);
    const [form] = Form.useForm();
    const updateData=async(values:{title:string; body:string})=>{
        setLoading(true);
        try{
         const {data}=await axios.put<Post>(`http://jsonplaceholder.typicode.com/posts/${post.id}`,{
            title:values.title,
            body:values.body,
         });
         onUpdate(data);
            message.success("post updated successfully");
         setLoading(false);
        }catch{
            message.error("please try again")
        }
      }
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={updateData}
      initialValues={{ title: post.title, body: post.body }}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter a title!' }]}
      >
        <Input placeholder="Enter post title" />
      </Form.Item>

      <Form.Item
        label="Body"
        name="body"
        rules={[{ required: true, message: 'Please enter the body!' }]}
      >
        <Input.TextArea rows={4} placeholder="Enter post content" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Update
        </Button>
      </Form.Item>
      <Button onClick={onCancel} block>
        Cancel
      </Button>
    </Form>
  )
}

export default UpdatePost