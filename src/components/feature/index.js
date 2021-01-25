import React from 'react';
import { Container, Title, SubTitle } from './styles/feature';

export default function Feature({ children, ...restProps }) {
	return <Container {...restProps}>{children}</Container>;
}

Feature.Title = function FeatureTitle({ children, ...restProps }) {
	return <Title {...restProps}>{children}</Title>;
};
Feature.SubTitle = function FeatureSubTitle({ children, ...restProps }) {
	return <SubTitle {...restProps}>{children}</SubTitle>;
};

// standard compound component
// 1) a container - styled component
// 2) a title - a styled component
// 3) a subtitle - a styled component

// compound components to put the component together
// add the feature component to index.js
