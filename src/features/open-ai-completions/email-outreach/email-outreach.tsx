import { Collapse, List } from 'antd';

import { IOutreachData, IOutreachItem } from '../open-ai-completions';
import { useState } from 'react';

export interface IEmailOutreachProps {
  outreach: IOutreachData[];
}

export default function EmailOutreach({ outreach }: IEmailOutreachProps) {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <Collapse onChange={onChange}>
      {outreach.map((data, index) => {
        if (data.data.length) {
          return (
            <Collapse.Panel header={data.name} key={index}>
              <List dataSource={data.data} renderItem={(item) => <ListItem item={item} />} />
            </Collapse.Panel>
          );
        } else {
          return (
            <Collapse.Panel header={data.name} key={index}>
              <p>{data.name}</p>
            </Collapse.Panel>
          );
        }
      })}
    </Collapse>
  );
}

function ListItem({ item }: { item: IOutreachItem }) {
  const [edit, setEdit] = useState(false);

  const onEditItem = () => {
    setEdit(!edit);
  };
  return (
    <List.Item actions={[<a key="list-loadmore-edit">edit</a>]}>
      <List.Item.Meta title={<ListItemTitle item={item} />} description={item.description} />
    </List.Item>
  );
}

function ListItemTitle({ item }: { item: IOutreachItem }) {
  if (item.link) {
    return (
      <a href={item.link} target="_blank" rel="noreferrer">
        {item.name}
      </a>
    );
  } else {
    return <>item.name</>;
  }
}
