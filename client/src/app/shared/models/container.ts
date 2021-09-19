export interface Container {
  name:            string;
  properties:      Properties;
  statusCode:      number;
  responseMessage: null;
}

export interface Properties {
  eTag:                  string;
  hasImmutabilityPolicy: boolean;
  hasLegalHold:          boolean;
  lastModified:          string;
  leaseStatus:           number;
  leaseState:            number;
  leaseDuration:         number;
  publicAccess:          number;
}
