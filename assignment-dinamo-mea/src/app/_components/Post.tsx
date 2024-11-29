'use client'
import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { Table, Spin, Alert, Button , Modal, Row, Col} from 'antd'
import UpdatePost from './UpdatePost';
import DeletePost from './DeletePost';
import { Post } from '../_interfaces/tyeps';

function Posts({isData}:{isData:Post[]}) {
    
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectPost, setSlectPost] = useState<Post | null>(null);
    const[showModal,setShowModal]=useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(()=>{
     const getData=async()=>{
       try{
        const {data}=await axios.get<Post[]>('http://jsonplaceholder.typicode.com/posts');
        setPosts([...data, ...isData]);    
        setLoading(false);
       }catch{
        setError("err fetch")
       }
     }
     getData()
    },[isData]);
    const handeleEdit=(post:Post)=>{
      setSlectPost(post);
      setShowModal(true);
    }
    const handeleUpdate=(updatedPost:Post)=>{
        setPosts((prev)=>prev.map((post)=>post.id===updatedPost.id?{...post,...updatedPost}:post));    
        handleCancel();
    }
    const handleCancel = () => {
        setShowModal(false);
        setSlectPost(null);
      };
      const handleDeletePost = (id:number|undefined)=>{
        setPosts((prev)=>prev.filter((post)=>post.id!==id));
      }
   
    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin spinning={loading} />
            </div>
        );
    }

    if (error) {
        return <Alert message="error" description={error} type="error" />;
    }
    const columns = [
        {
            title:'Post',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'title ',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'body',
            dataIndex: 'body',
            key: 'body',
        },
        {
            title: 'Update',
            key: 'action',
            render: (_: Post, record: Post) => (
                <Button onClick={()=> handeleEdit(record)}  type="primary">Edit</Button>
            ),
        },
        {
            title: 'Delete',
            key: 'action',
            render: (_: Post, record: Post) => (
                <DeletePost id={record.id} onDelete={handleDeletePost} />

            ),
        },
    ];
  return (
    <div style={{padding:'20px'}}>
   <Row gutter={[16,16]}>
    <Col xs={24} sm={24} md={24} lg={24} >
   <Table
        columns={columns}
        dataSource={posts} 
        rowKey="id"
        />
        </Col>
   </Row>
        <Modal
        title="Edit Post"
        open={showModal}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        {selectPost && (
          <UpdatePost
            post={selectPost}
            onUpdate={handeleUpdate}
            onCancel={handleCancel}
          />
        )}
        </Modal>
</div>
  )
}

export default Posts