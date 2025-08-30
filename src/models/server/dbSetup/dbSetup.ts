import { databases } from "../config";
import { db } from "../../name";
import createUsersCollection from "./user.collections";
import createSubsidiesCollection from "./subsidies.collection";
import createCompanyOperationsCollection from "./companyDetails/compnayOperations.collections";
import createCompanyContactsCollection from "./companyDetails/companyContacts.collections";
import createCompanyProfilesCollection from "./companyDetails/companyProfile.collections";
import createCompanyFinancialsCollection from "./companyDetails/companyFinacial.collections";
import createProjectsCollection from "./projectDetails/project.collections";
import createProjectComplianceCollection from "./projectDetails/projectCompliance.collections";
import createProjectFinancialsCollection from "./projectDetails/projectFinancial.collections";
import createProjectProductionCollection from "./projectDetails/projectProduction.collections";
import createProjectVerificationCollection from "./projectDetails/projectVerification.collections";

export default async function getOrCreateDatabase() {
  try {
    await databases.get(db);
    console.log("Database already exists.");
  } catch (error) {
    console.warn("Database not found, creating a new one...", error);

    try {
      await databases.create(db, db);
      console.log("Database created successfully.");

      await Promise.all([
        createUsersCollection(),
        createSubsidiesCollection(),
        createCompanyOperationsCollection(),
        createCompanyContactsCollection(),
        createCompanyProfilesCollection(),
        createCompanyFinancialsCollection(),
        createProjectsCollection(),
        createProjectComplianceCollection(),
        createProjectFinancialsCollection(),
        createProjectProductionCollection(),
        createProjectVerificationCollection(),
      ]);
      console.log("Collections created successfully.");
    } catch (createError) {
      console.error("Failed to create database:", createError);
      throw createError; // Re-throw to handle in calling code
    }
  }

  console.log("Database connected successfully.");
  return databases;
}
