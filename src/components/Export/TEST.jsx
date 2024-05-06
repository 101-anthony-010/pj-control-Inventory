import React from 'react';
import { Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: 'yellow'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  images: {
    width: 100,
    height: 100,
    backgroundColor: 'red'
  }
});

// Create Document Component
const Test = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text>Este es un texto</Text>
      <Image style={styles.images} src={'/img/PJ.jpg'} />
      <Text>Este es un texto</Text>
    </Page>
  </Document>
);
export default Test;