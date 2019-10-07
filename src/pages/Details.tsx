import React from 'react';
import { 
  IonBackButton, 
  IonButtons, 
  IonCard, 
  IonHeader, 
  IonPage, 
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonToolbar, 
  IonTitle, 
  IonContent 
} from '@ionic/react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';


const GET_POST = gql`
query GET_POST($postId: Int) {
  postBy(postId: $postId) {
    id
    postId
    title
    content
    featuredImage{
      sourceUrl
    }
  }
}`;

const Details: React.FC = (props:any) => {
  const {postId} = props.match.params;  
  const { loading, error, data } = useQuery(GET_POST, {variables: { postId }} );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
    const {title,content,featuredImage} = data.postBy;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab2" />
          </IonButtons>
          <IonTitle>Volver</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonCard>
        
        <IonCardHeader>
          <IonCardTitle>{title}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent><img src={featuredImage.sourceUrl} alt="" /><br />{content}</IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Details;
