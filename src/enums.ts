
  // En un archivo types.ts
  export enum FlowTypeEnum {
    FlowType1 = 0,
    FlowType2 = 1,
  }

  export enum DocumentTypeFromDocumentLibrary {
    Type1 = 3,
    Type2 = 4,
    Type3 = 5,
    Type4 = 6,
  }

  export enum SigningRepresentative {
    Representative1 = 0,
    Representative2 = 1,
    Representative3 = 2,
  }

  export enum Channel {
    Credit = 2,
  }

  export interface Position {
    leftCoordinateX: number;
    rightCoordinateX: number;
    coordinateUpY: number;
    coordinateDownY: number;
  }

  export interface MassTransitSignatories {
    userNameSignatory: string;
    signingRepresentative: SigningRepresentative;
    signatureFlow: number;
    clientDirectoryId: string;
    clientGuid: string;
    interviewId: string;
    verifyOtp: string;
    pageSign: number;
    useDefaultDirectory: boolean;
    position: Position;
  }

  export interface MassTransitSingSetting {
    signatories: MassTransitSignatories[];
  }

  export interface MassTransitLoanSingDocument {
    documentId: string;
    documentType: DocumentTypeFromDocumentLibrary;
    singSetting?: MassTransitSingSetting;
    topicName: string;
  }

  export interface MassTransitSignedLoanDocuments {
    flowType: FlowTypeEnum;
    documentDirectoryId: string | null;
    documents: MassTransitLoanSingDocument[];
    documentOwnerComplete: boolean;
    notificationSignedDocument?: any; // Define más si es necesario
    channel: Channel;
  }

  export interface MessageLogger {
    input: MassTransitSignedLoanDocuments;
    output?: any;
    messageText: string;
    methodName: string;
    className: string;
  }
