'use client'
import axios from 'axios'
import React, { useState } from 'react'
import {Form,Input,Button,message,Modal} from 'antd';
import Posts from './Post';
import { Post } from '../_interfaces/tyeps';

function AddPost() {
    const [modalShow,setModelShow]=useState(false);
    const [loading,setLoading]=useState(false);
    const [isData,setIsData]=useState<Post[]>([]);

    const [form] = Form.useForm();
    const handleOpenModal = () => {
        setModelShow(true);
      };
        const onSubmit=async(values:{title:string; body:string})=>{
            setLoading(true);
          try{
           const {data}=await axios.post<Post>('https://jsonplaceholder.typicode.com/posts',{
            title:values.title,
            body:values.body
           });
           console.log(data);
           setIsData((prev)=>[...prev,data]);
           form.resetFields();
           message.success("post added successfully");
           setModelShow(false);
          }catch{
           message.error("please try again")
          } finally{ setLoading(false);}
        }
        const handleCloseModal = () => {
                setModelShow(false);
          };
  return (
    <div>
     <div style={{padding:"20px"}}>
     <h1 style={{display:"flex",justifyContent:"center",position:"relative"}}>CRUD</h1>

       <div style={{display:"flex",justifyContent:"center",marginTop:"20px"}}>  
        <Button type="primary" onClick={handleOpenModal}>
        Add New Post
      </Button>
      </div>
      </div>

      <Modal
        title="Create a New Post"
        open={modalShow}
        onCancel={handleCloseModal}
        footer={null} 
        destroyOnClose={true}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={ onSubmit}
          initialValues={{
            title: '',
            body: '',
          }}
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Posts isData={isData}/>
    </div>
    
  )
}

export default AddPost