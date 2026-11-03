/* import { db } from "../store/firebase";

export const saveToFirebaseTechnical =  async (data) => {
    try {
      await db.collection('technicalData').add(data);
      console.log("Datos guardados en Firebase correctamente.");
    } catch (error) {
      console.error("Error al guardar en Firebase:", error);
    }
  }


  export const getToFirebaseTechnical = async (historyKey) => {
    try {
      const querySnapshot = await db.collection('technicalData')
      .where('IDHistory', '==', historyKey).get();
      
      if (querySnapshot.empty) {
        console.log('No existe ningún documento con el ID proporcionado.');
        return null;
      }
      const doc = querySnapshot.docs[0];
      console.log("Datos recuperados de Firebase correctamente.", doc.data());
      return doc.data();
    } catch (error) {
      console.error("Error al recuperar de Firebase:", error);
      throw error; 
    }
  }

  

  export const saveToFirebaseSystemRevision =  async (data) => {
    try {
      await db.collection('systemRevisionData').add(data);
      console.log("Datos guardados en Firebase correctamente.");
    } catch (error) {
      console.error("Error al guardar en Firebase:", error);
    }
  }

  export const saveToFirebasePhysicalExam =  async (data) => {
    try {
      await db.collection('physicalExamData').add(data);
      console.log("Datos guardados en Firebase correctamente.");
    } catch (error) {
      console.error("Error al guardar en Firebase:", error);
    }
  }

  export const saveToFirebaseDiagnostic =  async (data) => {
    try {
      await db.collection('diagnosticData').add(data);
      console.log("Datos guardados en Firebase correctamente.");
    } catch (error) {
      console.error("Error al guardar en Firebase:", error);
    }
  }

  export const saveToFirebaseAnalysis =  async (data) => {
    try {
      await db.collection('analysisData').add(data);
      console.log("Datos guardados en Firebase correctamente.");
    } catch (error) {
      console.error("Error al guardar en Firebase:", error);
    }
  }

  export const saveToFirebaseJobrecommendation =  async (data) => {
    try {
      await db.collection('jobrecommendationData').add(data);
      console.log("Datos guardados en Firebase correctamente.");
    } catch (error) {
      console.error("Error al guardar en Firebase:", error);
    }
  }

  export const saveToFirebaseEvolution =  async (data) => {
    try {
      await db.collection('evolutionData').add(data);
      console.log("Datos guardados en Firebase correctamente.");
    } catch (error) {
      console.error("Error al guardar en Firebase:", error);
    }
  }

  export const saveToFirebaseOrders =  async (data) => {
    try {
      await db.collection('ordersData').add(data);
      console.log("Datos guardados en Firebase correctamente.");
    } catch (error) {
      console.error("Error al guardar en Firebase:", error);
    }
  }

  export const saveToFirebaseIncapacities =  async (data) => {
    try {
      await db.collection('incapacitiesData').add(data);
      console.log("Datos guardados en Firebase correctamente.");
    } catch (error) {
      console.error("Error al guardar en Firebase:", error);
    }
  }

  export const saveToFirebaseOrdersRemission =  async (data) => {
    try {
      await db.collection('ordersRemissionData').add(data);
      console.log("Datos guardados en Firebase correctamente.");
    } catch (error) {
      console.error("Error al guardar en Firebase:", error);
    }
  }

  export const saveToFirebaseVaccination =  async (data) => {
    try {
      await db.collection('vaccinationData').add(data);
      console.log("Datos guardados en Firebase correctamente.");
    } catch (error) {
      console.error("Error al guardar en Firebase:", error);
    }
  }

  export const saveToFirebaseGynecology =  async (data) => {
    try {
      await db.collection('gynecologyData').add(data);
      console.log("Datos guardados en Firebase correctamente.");
    } catch (error) {
      console.error("Error al guardar en Firebase:", error);
    }
  }
 */