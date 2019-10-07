import React, {useState} from 'react';
import { 
  IonHeader, 
  IonToolbar,
  IonInput, 
  IonPage, 
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonTextarea,
  IonToast,
  IonButton
} from '@ionic/react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const SAVE_CONTACT_ENTRY = gql`
  mutation insert_entry($objects: [contact_insert_input!]!) {
        insert_contact(objects: $objects) {
        returning {
        id
        }
    }
  }
`;

const Tab3Page: React.FC = () => {
  const [insert_contact] = useMutation(SAVE_CONTACT_ENTRY);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [asunto,setAsunto] = useState('');
  const [mensaje,setMensaje] = useState('');
  const [showToast, setShowToast] = useState(false);
  const handleForm = (e:any) => {
    e.preventDefault();
    insert_contact({variables: {objects:{
      name,
      subject: asunto,
      email,
      message: mensaje
    }}}).then((x:any) => {
      if(x){
        setShowToast(true)
      }
      setName('');
      setEmail('');
      setAsunto('');
      setMensaje('')
    });
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contactanos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p>Para cualquier inquitued que necesites, puedes contactarnos con el formulario mas abajo</p>
        <form onSubmit={handleForm} noValidate={true}>
            <IonItem>
          <IonLabel position="floating">Nombre</IonLabel>
          <IonInput value={name} onIonChange={(e:any) => setName(e.target.value)} required={true}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput value={email} onIonChange={(e:any) => setEmail(e.target.value)} required></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Asunto</IonLabel>
            <IonInput value={asunto} onIonChange={(e:any) => setAsunto(e.target.value)} required></IonInput>
          </IonItem>
          <IonItem>
            <IonTextarea placeholder="Mensaje..." value={mensaje} onIonChange={(e:any) => setMensaje(e.target.value)} required></IonTextarea>
          </IonItem>
          <IonButton type="submit" color="primary" expand="block" >Enviar</IonButton>
        </form>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Su mensaje fue enviado!"
          duration={2000}
        />
  </IonContent>
    </IonPage>
  );
};

export default Tab3Page;
