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
          ...AmountInfo
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
    }
    input {
      ingredients {
        food {
          name
          id
          modifier
        }
        amount {
          ...AmountInfo
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

  fragment AmountInfo on Amount {
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
`;
