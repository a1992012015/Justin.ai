import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { ImagesResponseDataInner } from 'openai/api';
import { CreateImageRequestSizeEnum } from 'openai';

import styles from './open-ai-image.module.css';
import { creatAIImages } from '../../services/open-ai.service';

type TStatus = 'typing' | 'submitting' | 'success' | 'error';

export interface ICreatFormListProps {
  status: TStatus;
  setStatus: Dispatch<SetStateAction<TStatus>>;
  setImage: Dispatch<SetStateAction<ImagesResponseDataInner[]>>;
}

export interface ICreateAiImagesProps {
  status: TStatus;
  images: Array<ImagesResponseDataInner>;
}

export default function OpenAiImage() {
  const [status, setStatus] = useState<TStatus>('typing');
  const [image, setImage] = useState<Array<ImagesResponseDataInner>>([]);

  return (
    <>
      <CreatFormList setImage={setImage} setStatus={setStatus} status={status} />

      <CreateAiImages images={image} status={status} />
    </>
  );
}

function CreatFormList({ setImage, setStatus, status }: ICreatFormListProps) {
  const onFinish = (value: { prompt: string; count: number; size: CreateImageRequestSizeEnum }) => {
    getListEngines(value.prompt, value.count, value.size);
  };

  const getListEngines = (message: string, count: number, size: CreateImageRequestSizeEnum) => {
    setStatus('submitting');
    creatAIImages(message, count, size).then(
      (res) => {
        setImage(res.data.data);
        setStatus('success');
      },
      () => {
        setStatus('error');
      }
    );
  };

  return (
    <Form
      initialValues={{ count: 1, prompt: '', size: '256x256' }}
      disabled={status === 'submitting'}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="prompt" label="Prompt" rules={[{ required: true, message: 'Please pick an item!' }]}>
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item name="size" label="Size">
        <Select placeholder="Please select a country">
          <Select.Option value="256x256">256x256</Select.Option>
          <Select.Option value="512x512">512x512</Select.Option>
          <Select.Option value="1024x1024">1024x1024</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="count" label="Count" rules={[{ required: true, message: 'Please pick an item!' }]}>
        <InputNumber min={1} max={10} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button loading={status === 'submitting'} type="primary" htmlType="submit">
          Submit
        </Button>
        {status === 'error' && <span className={styles['submit-error']}>Please try again</span>}
      </Form.Item>
    </Form>
  );
}

function CreateAiImages({ images, status }: ICreateAiImagesProps) {
  if (images.length) {
    return (
      <div className={styles['ai-images']}>
        {images.map((item, index) => (
          <img className={styles['ai-image']} src={item.url} key={index} alt="ai-img" />
        ))}
      </div>
    );
  } else if (status === 'error') {
    return <div>Can not get images.</div>;
  } else {
    return null;
  }
}
