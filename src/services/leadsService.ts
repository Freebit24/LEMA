import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase"; // Ensure firebase.ts is properly configured

const leadsCollection = collection(db, "leads");

export const getLeads = async () => {
  const snapshot = await getDocs(leadsCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createLead = async (data: any) => {
  return await addDoc(leadsCollection, data);
};

export const updateLead = async (id: string, data: any) => {
  const leadDoc = doc(leadsCollection, id);
  return await updateDoc(leadDoc, data);
};

export const deleteLead = async (id: string) => {
  const leadDoc = doc(leadsCollection, id);
  return await deleteDoc(leadDoc);
};