import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React from 'react';
import './Tab1.css';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Services from '../interfaces/services'

const GET_SERVICES = gql`
  {
  servicios{
    id
    title
    content,
    img
  }
}
`;

const Tab1: React.FC = () => {
  const { loading, error, data } = useQuery(GET_SERVICES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Servicios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {
          data.servicios.map( (s: Services) => {
            return <IonCard  key={s.id}>
            <img src={s.img} alt="" />
            <IonCardHeader>
              <IonCardTitle>{s.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>
                {s.content}
              </p>
            </IonCardContent>
          </IonCard>
          })
        }
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
