import { useEffect, useState } from 'react'
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import './index.scss'
import {
  createArticleAPI,
  getArticleByIdAPI,
  updateArticleAPI,
} from '@/apis/article'
import { useChannel } from '@/hooks/useChannel'

const { Option } = Select

const Publish = () => {
  const { channelList } = useChannel()

  const onFinish = async (values) => {
    if (imageType !== imageList.length)
      return message.warning('封面类型和图片数量不匹配')
    const { title, content, channel_id } = values
    const reqData = {
      title,
      content,
      cover: {
        type: imageType,
        images: imageList.map((item) =>
          item.response ? item.response.data.url : item.url
        ),
      },
      channel_id,
    }
    if (articleId) {
      updateArticleAPI({ ...reqData, id: articleId })
    } else {
      createArticleAPI(reqData)
    }
  }

  const [imageList, setImageList] = useState([])
  const onUploadChange = (value) => {
    setImageList(value.fileList)
  }

  const [imageType, setImageType] = useState(0)
  const onTypeChange = (e) => {
    setImageType(e.target.value)
  }

  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')
  const [form] = Form.useForm()
  useEffect(() => {
    async function getArticleDetail() {
      const res = await getArticleByIdAPI(articleId)
      const data = res.data
      const { cover } = data
      form.setFieldsValue({
        ...data,
        type: cover.type,
      })
      setImageType(cover.type)
      setImageList(cover.images.map((url) => ({ url })))
    }
    articleId && getArticleDetail()
  }, [articleId, form])

  return (
    <div className='publish'>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={'/'}>首页</Link> },
              { title: `${articleId ? '编辑' : '发布'}文章` },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: imageType }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label='标题'
            name='title'
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input
              placeholder='请输入文章标题'
              style={{ width: 400 }}
            />
          </Form.Item>
          <Form.Item
            label='频道'
            name='channel_id'
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select
              placeholder='请选择文章频道'
              style={{ width: 400 }}
            >
              {channelList.map((item) => (
                <Option
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label='封面'>
            <Form.Item name='type'>
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 && (
              <Upload
                name='image'
                listType='picture-card'
                showUploadList
                action={'http://geek.itheima.net/v1_0/upload'}
                onChange={onUploadChange}
                maxCount={imageType}
                fileList={imageList}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label='内容'
            name='content'
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              className='publish-quill'
              theme='snow'
              placeholder='请输入文章内容'
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button
                size='large'
                type='primary'
                htmlType='submit'
              >
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish
