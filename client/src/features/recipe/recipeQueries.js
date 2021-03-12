import { gql } from "@apollo/client";

export const RecipeQuery = gql`
  query Recipe($id: ID!) {
    recipe(id: $id) {
      id
      name
      product {
        food {
          name
        }
        amount {
          ... on MeasuredAmount {
            exactQuantity
            unit {
              symbol
            }
          }
          ... on RoughAmount {
            quantity
            unit {
              name {
                singular
                plural
              }
            }
          }
          ... on RawQuantity {
            exactQuantity
          }
        }
      }
      finalStep {
        ...StepInfo
      }
      allOtherSteps {
        ...StepInfo
      }
    }
  }

  fragment StepInfo on Step {
    id
    instruction {
      text
    }
    attentionLevel {
      id
      label
      description
      ordering
    }
    input {
      ingredients {
        food {
          name
          id
          modifier
        }
        amount {
          ... on MeasuredAmount {
            exactQuantity
            unit {
              symbol
            }
          }
          ... on RoughAmount {
            quantity
            unit {
              name {
                singular
                plural
              }
            }
          }
          ... on RawQuantity {
            exactQuantity
          }
        }
        optional
      }
      previousSteps {
        id
      }
    }
    time {
      estimatedDurationInSeconds
    }
    alternativeSteps {
      id
    }
  }
`;
