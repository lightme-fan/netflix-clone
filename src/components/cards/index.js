import React, {useContext, useState, createContext} from 'react';

import {
        Container, 
        Group,
        Title,
        SubTitle,
        Text,
        Entities,
        Feature,
        FeatureTitle,
        Item,
        Image,
        FeatureClose,
        FeatureText,
        Maturity,
        Content,
        Meta
    } from './styles/card';

const FeatureContent = createContext();

export default function Card({children, ...restProps}) {
  const [showFeature, setShowFeature] = useState(false);
  const [itemFeature, setItemFeature] = useState(false)

  return (
    <FeatureContent.Provider value={{showFeature, itemFeature, setShowFeature, setItemFeature}}>
      <Container {...restProps}>{children}</Container>
    </FeatureContent.Provider>
  )
}

Card.Group = function CardGroup({children, ...restProps}) {
  return(<Group {...restProps}>{children}</Group>)
}

Card.Title = function CardTitle({children, ...restProps}) {
  return(<Title {...restProps}>{children}</Title>)
}

Card.SubTitle = function CardSubTitle({children, ...restProps}) {
  return(<SubTitle {...restProps}>{children}</SubTitle>)
}

Card.Entities = function CardEntities({children, ...restProps}) {
  return(<Entities {...restProps}>{children}</Entities>)
}

Card.Text = function CardText({children, ...restProps}) {
  return(<Text {...restProps}>{children}</Text>)
}

Card.Meta = function CardMeta({children, ...restProps}) {
  return(<Meta {...restProps}>{children}</Meta>)
}

Card.Item = function CardItem({ item, children, ...restProps}) {
  const {setShowFeature, setItemFeature} = useContext(FeatureContent);
  return(<Item onClick={() => {setItemFeature(item),
        setShowFeature(true)
        }}
        {...restProps}
    >
        {children}
    </Item>)
}

Card.Image = function CardImage({...restProps}) {
  return <Image {...restProps}/>
}

Card.Feature = function CardFeature({category, children, ...restProps}) {
  const { showFeature, itemFeature, setShowFeature } = useContext(
    FeatureContent
  );

  return showFeature ? (
    <Feature src={`/images/${category}/${itemFeature.genre}/${itemFeature.slug}/large.jpg`}>
      <Content>
        <FeatureTitle>
          {itemFeature.title}
        </FeatureTitle>
        <FeatureText>{itemFeature.description}</FeatureText>
        <FeatureClose onCLick={() =>setShowFeature(false)}>
          <img src="/images/icons/close.png" alt="close"></img>
        </FeatureClose>
       <Group margin="30px 0" flexDirection="row" alignItems="center">
         <Maturity rating={itemFeature.maturity}>{itemFeature.maturity < 12 ? 'PG' :
           itemFeature.maturity}
         </Maturity>
         <FeatureText fontWeight="bold">
           {itemFeature.genre.chartAt(0).toUpperCase() + itemFeature.genre.slice(1)}
         </FeatureText>
       </Group>
        {children}
      </Content>
    </Feature>
  )
  : null;
}