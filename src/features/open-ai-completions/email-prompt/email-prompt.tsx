import React, { Dispatch, SetStateAction } from 'react';
import { CreateCompletionResponseChoicesInner } from 'openai/api';
import { Button, Form, Input, InputNumber } from 'antd';

import { IOutreachData, TEmailState } from '../open-ai-completions';
import { createAICompletion } from '../../../services/open-ai.service';

export interface IEmailPromptProps {
  outreach: IOutreachData[];
  setRequestState: Dispatch<SetStateAction<TEmailState>>;
  setText: Dispatch<SetStateAction<Array<CreateCompletionResponseChoicesInner>>>;
}

export default function EmailPrompt(props: IEmailPromptProps) {
  const onFinish = (params: { prompt: string; n: number; max_tokens: number }) => {
    console.log('prompt', prompt);
    props.setRequestState('submitting');

    console.log(params);
    createAICompletion(params)
      .then((response) => {
        console.log('createAICompletion', response);
        props.setText(response.data.choices);
        props.setRequestState('success');
      })
      .catch((error) => {
        console.log('error', error);
        props.setRequestState('error');
      });
  };

  const prompt2 = props.outreach.reduce((result, data, pi) => {
    const mergeInformation = data.data.reduce((content, outreach, oi) => {
      const name = outreach.name;
      const link = outreach.link;
      const description = outreach.description;
      if (data.name === 'CVs') {
        content += `  ${name}(${description}): ${link}\n`;
      } else {
        if (description instanceof Array) {
          content += description.reduce((merge, de, di) => {
            merge += `    ${di + 1}. ${de}\n`;
            return merge;
          }, `  ${name}:\n`);
        } else {
          content += `  ${name}${description ? `: ${description}` : ''}${link ? `: ${link}` : ''}\n`;
        }
      }
      return oi === data.data.length - 1 ? `${content}\n` : content;
    }, `${result}${data.name}:\n`);
    if (pi === props.outreach.length - 1) {
      return `${mergeInformation}\nI want to send an email to SafeButler inquiring if they need our support. Please describe our company\'s advantages based on their company\'s characteristics in the email.`;
    } else {
      return mergeInformation;
    }
  }, 'This is information about our company:\n\n');

  const prompt =
    'This is information about our company:\n' +
    '\n' +
    'Sample CVs\n' +
    '  Mid-level fullstack: https://wcp.57blocks.com/talent/e/xq0rEa\n' +
    '  Sr fullstack: https://wcp.57blocks.com/talent/e/PaVjVa\n' +
    '  Sr mobile engineer: https://wcp.57blocks.com/talent/e/1amxPZ\n' +
    '  Sr backend engineer: https://wcp.57blocks.com/talent/e/WZG2nq\n' +
    '  Sr QE engineer: https://wcp.57blocks.com/talent/e/GaDwZw\n' +
    '  Software Architect: https://wcp.57blocks.com/talent/e/xZj7a7\n' +
    '  Sr Smartcontract enginee / architect: https://wcp.57blocks.com/talent/e/DZz6Zk\n' +
    '  Sr web3 lead: https://wcp.57blocks.com/talent/e/wa9MaV\n' +
    '\n' +
    'Case Studies\n' +
    '  1. Digital Health startup:  https://docsend.com/view/ttgv8z7jc2sieczg\n' +
    '  2. Proprety Tech: https://docsend.com/view/9k5cw5mwitweup33\n' +
    'web3\n' +
    '  1. Huma.finance (Invoice Factoring DeFi Protocol) \n' +
    '  2. Gro.xyz (DeFi Stablecoin Yield Protocol)\n' +
    '  3. Tokenpad.io (crypto investment mobile app) \n' +
    '\n' +
    'Other Highlights \n' +
    '  1. Foothill partner \n' +
    '  2. FAANG/BAT level talent \n' +
    '  3. Vertical experience: Fintech, DeFi, SaaS, Marketplace, AgiTech, Digital health\n' +
    '  4. Social proof \n' +
    '    a. Accelerators: YC, StartX, TechStars\n' +
    '    b. VCs: Foothill\n' +
    '    c. Big tech: Google, Autodesk, Paypal\n' +
    '\n' +
    'Value samples & client testimonials \n' +
    '  1. DocEquity: Enable document AI startup to product solid enough to win 700k ARR to raise a seed.  \n' +
    '  2. AlwaysHealth: Built digital health 3d product to be polished enough to be deployed wide in stanford hospitals \n' +
    '  3. Revshop: built enterprise print SaaS with highly complex workflows in 6 months\n' +
    '  4. (not ready yet) Enable gen AI startup to build demo to close funding from a16z, sequoia, graylock\n' +
    '\n' +
    "I want to send an email to SafeButler inquiring if they need our support. Please describe our company's advantages based on their company's characteristics in the email.";

  return (
    <Form initialValues={{ prompt: prompt2, n: 2, max_tokens: 1024 }} onFinish={onFinish} layout="vertical">
      <Form.Item name="prompt" label="Prompt">
        <Input.TextArea
          placeholder="Please provide clear, concise, and specific instructions for the email, including:&#10;Recipient(s) &#10;Tone or style of the email &#10;Key information to be highlighted"
          autoSize={{ minRows: 5, maxRows: 20 }}
        />
      </Form.Item>
      <Form.Item name="n" label="Create count" rules={[{ required: true }]}>
        <InputNumber min={1} max={5} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="max_tokens" label="Max Token" rules={[{ required: true }]}>
        <InputNumber min={10} max={2048} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
