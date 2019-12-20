import gql from 'graphql-tag';

export const QUERY_CODES = gql`
    query QueryCodes($data: QueryCodeInput) {
        codes(data: $data) {  
            codigo
            descripcion
            mensaje
            anulado
            fecha
            empresa
        }
    }
`;

export const INSERT_CODE = gql`
  mutation InsertCode($data: InsertCodeInput!) {
    insertCode(data: $data) 
  }
`;

export const UPDATE_CODE = gql`
  mutation UpdateCode($code: String!, $data: UpdateCodeInput!) {
    updateCode(code: $code, data: $data) 
  }
`;

export const INSERT_CODES = gql`
  mutation InsertCodes($insertCodesInput: [InsertCodeInput!]!) {
    insertCodes(data: $insertCodesInput) 
  }
`;