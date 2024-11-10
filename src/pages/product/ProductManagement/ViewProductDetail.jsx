import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../ProductManagement/ViewProductDetail.css'
import { Layout, Button, Spin } from 'antd';
import { FolderViewOutlined, RollbackOutlined } from '@ant-design/icons';
import { useGetProductsByIdQuery } from '../../../services/productAPI';
import { formatPrice } from '../../../utils/utils';


export default function ViewProductDetail() {
    // const [loading, setLoading] = useState(true);
    const { Sider, Content } = Layout;
    const siderStyle = {
        textAlign: 'center',
        minHeight: 200,
        lineHeight: '100px',
        color: '#fff',
        backgroundColor: '#fff',

    };
    const contentStyle = {
        textAlign: 'start',
        minHeight: 100,
        lineHeight: '70px',
        color: 'black',
        backgroundColor: '#fff',
    };

    let { productId } = useParams();
    const {
        data: productData,
        error: productError
    } = useGetProductsByIdQuery(productId);

    const navigate = useNavigate()
    const handleBack = () => {
        navigate('/product');
    };



    return (
        <>
            {!productError ? <div className='container'>
                <p className='header-detail'>Product Detail</p>
                <Layout>
                    <Sider width="55%" style={siderStyle}>
                        <div className='container-img'>
                            <img src={productData?.img}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    marginTop: '40px',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                                }} />
                        </div>
                    </Sider>
                    <Content style={contentStyle}>
                        <div style={{ margin: '22px 0px 0px 0px', fontSize: '20px' }}>
                            <p>
                                Name:
                                <span style={{ fontWeight: 'bolder', marginLeft: '10px', fontSize: '23px' }}>{productData?.name}</span>
                            </p>
                            <p>
                                Barcode:
                                <span style={{ fontWeight: 'bolder', marginLeft: '10px', fontSize: '23px' }}>{productData?.barcode}</span>
                            </p>
                            <p>
                                Category:
                                <span style={{ fontWeight: 'bolder', marginLeft: '10px', fontSize: '23px' }}>{productData?.typeId}</span>
                            </p>
                            <p>
                                Weight:
                                <span style={{ fontWeight: 'bolder', marginLeft: '10px', fontSize: '23px' }}>{productData?.weight}</span>
                            </p>
                            <p>
                                Price Stone:
                                <span style={{ fontWeight: 'bolder', marginLeft: '10px', fontSize: '23px' }}>{formatPrice(productData?.stonePrice)}</span>
                            </p>
                            <p>
                                Price Processing:
                                <span style={{ fontWeight: 'bolder', marginLeft: '10px', fontSize: '23px' }}>{formatPrice(productData?.manufactureCost)}</span>
                            </p>
                            <p>
                                Description:
                                <span style={{ fontWeight: 'bolder', marginLeft: '10px', fontSize: '23px' }}>{productData?.description}</span>
                            </p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }} >
                            <span style={{ marginLeft: '10px', fontSize: '20px' }}>
                                View Certificate:
                            </span>
                            <a style={{ marginLeft: '10px', fontSize: '23px', fontWeight: 'bolder', color: 'red' }} href={productData?.certificateUrl}><FolderViewOutlined style={{ marginRight: '5px' }} />Click here to view Certicate</a>
                        </div>
                    </Content>
                </Layout>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                    <Button
                        type="primary"
                        onClick={handleBack}
                        icon={<RollbackOutlined />}
                    >
                        Back to Product page
                    </Button>
                </div>

            </div> :
                <div>
                    {productError?.data}
                </div>}

        </>

    )
}
