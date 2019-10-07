import React from 'react';
import { 
  IonContent, 
  IonSpinner,
  IonHeader, 
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCard,
  IonPage, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

const GET_NEWS = gql`
query{
  posts{
   nodes{
    postId
    title
    excerpt
    featuredImage {
      sourceUrl
    }
  }
  }
}`;


const Tab2: React.FC = () => {
  const { loading, error, data } = useQuery(GET_NEWS);
  if (loading) return <IonSpinner name="bubbles" />;
  if (error) return <p>Error :(</p>;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Noticias</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {data.posts.nodes.map((p:any) => {
          const url = `tab2/details/${p.postId}`;
          return <IonCard key={p.postId}>
            <img src={p.featuredImage.sourceUrl} alt="" />
            <IonCardHeader>
              <IonCardTitle>
                <Link to={url} >{p.title}</Link>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
            <div>{p.excerpt} <Link to={url} >Ver más</Link></div>
            </IonCardContent>
          </IonCard>
        })}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;