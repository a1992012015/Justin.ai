import { CreateCompletionResponseChoicesInner } from 'openai/api';
import { Alert, Card, Collapse, Space, Spin } from 'antd';
import { useState } from 'react';

import styles from './open-ai-completions.module.css';
import EmailPrompt from './email-prompt/email-prompt';
import EmailOutreach from './email-outreach/email-outreach';

export interface IOutreachData {
  name: string;
  data: IOutreachItem[];
}

export interface IOutreachItem {
  name: string;
  link: string;
  description: string | string[];
}

export type TEmailState = 'submitting' | 'success' | 'error';

export default function OpenAiCompletions() {
  const [emails, setText] = useState<Array<CreateCompletionResponseChoicesInner>>([]);
  const [state, setRequestState] = useState<TEmailState>('success');

  const outreach: IOutreachData[] = [
    {
      name: 'CVs',
      data: [
        { description: 'Mid-level fullstack', link: 'https://wcp.57blocks.com/talent/e/xq0rEa', name: 'Chalice Li' },
        { description: 'Sr fullstack', link: 'https://wcp.57blocks.com/talent/e/PaVjVa', name: 'Teki Yang' },
        { description: 'Sr mobile engineer', link: 'https://wcp.57blocks.com/talent/e/1amxPZ', name: 'Juan Quintero' },
        {
          description: 'Sr backend engineer',
          link: 'https://wcp.57blocks.com/talent/e/WZG2nq',
          name: 'David Alejandro Garcia Hernandez'
        },
        { description: 'Sr QE engineer', link: 'https://wcp.57blocks.com/talent/e/GaDwZw', name: 'Jia Chen' },
        { description: 'Software Architect', link: 'https://wcp.57blocks.com/talent/e/xZj7a7', name: 'Roy Xie' },
        {
          description: 'Sr Smartcontract enginee / architect',
          link: 'https://wcp.57blocks.com/talent/e/DZz6Zk',
          name: 'Bin Li'
        },
        { description: 'Sr web3 lead', link: 'https://wcp.57blocks.com/talent/e/wa9MaV', name: 'Wei Wang' }
      ]
    },
    {
      name: 'Case Studies',
      data: [
        { name: 'Digital Health startup', link: 'https://docsend.com/view/ttgv8z7jc2sieczg', description: '' },
        { name: 'Proprety Tech', link: 'https://docsend.com/view/9k5cw5mwitweup33', description: '' },
        {
          name: 'web3',
          link: '',
          description: [
            'Huma.finance (Invoice Factoring DeFi Protocol)',
            'Gro.xyz (DeFi Stablecoin Yield Protocol)',
            'Tokenpad.io (crypto investment mobile app)'
          ]
        }
      ]
    },
    {
      name: 'Other Highlights',
      data: [
        { name: 'Foothill partner', link: '', description: '' },
        { name: 'FAANG/BAT level talent', link: '', description: '' },
        {
          name: 'Vertical experience',
          link: '',
          description: 'Fintech, DeFi, SaaS, Marketplace, AgiTech, Digital health'
        },
        {
          name: 'Social proof',
          link: '',
          description: ['Accelerators: YC, StartX, TechStars', 'VCs: Foothill', 'Big tech: Google, Autodesk, Paypal']
        }
      ]
    },
    {
      name: 'Value samples & client testimonials',
      data: [
        {
          name: 'DocEquity',
          link: '',
          description: 'Enable document AI startup to product solid enough to win 700k ARR to raise a seed.'
        },
        {
          name: 'AlwaysHealth',
          link: '',
          description: 'Built digital health 3d product to be polished enough to be deployed wide in stanford hospitals'
        },
        {
          name: 'Revshop',
          link: '',
          description: 'built enterprise print SaaS with highly complex workflows in 6 months'
        }
      ]
    }
  ];

  return (
    <>
      <EmailOutreach outreach={outreach}></EmailOutreach>

      <div style={{ height: 30 }}></div>

      <EmailPrompt outreach={outreach} setText={setText} setRequestState={setRequestState} />

      <div style={{ height: 30 }}></div>

      <Card type="inner" title="Email response">
        {state === 'success' ? (
          emails.length ? (
            <Collapse bordered={false}>
              {emails.map((email, index) => {
                return (
                  <Collapse.Panel header={`Email template ${index + 1}`} key={index}>
                    <p style={{ whiteSpace: 'break-spaces' }}>{email.text}</p>
                  </Collapse.Panel>
                );
              })}
            </Collapse>
          ) : (
            <div>No Data</div>
          )
        ) : state === 'submitting' ? (
          <Space style={{ width: '100%', justifyContent: 'center' }}>
            <Spin tip="Loading" size="large">
              <div className={styles.content} />
            </Spin>
          </Space>
        ) : (
          <Alert message="Error" description="Something went wrong." type="error" showIcon />
        )}
      </Card>
    </>
  );
}
