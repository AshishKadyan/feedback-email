

const event1 = {
  "Records": [
    {
      "messageId": "2c70ff55-a46f-4f36-91be-482473ae4a12",
      "receiptHandle": "AQEBqHt7Gs7eYRCyAYgTMGs7rjwgQ38gBnS74l+gl+QiQklHHctoYR9jVvMr5OhN7x6rZEh4LcJD0x8C+JlDnbiIByXItsbnKGistj31MUMnFm5CPMda/RuDAqGFOc4d+Lmv15+PHgp9XglbM0bEAo6LwkgKcUP+VOiR6Gy5clfpyTampMmsieuy6f28Xkn8j6MO5vQQJX85t0qpZtrQ5hjekM2RvpdnBwZhjZxeUrsE1ZBJ0W9fMsnFVogxCZZKxZ5evoV/OMTYrzVhMNGH0wKcIySIk/kpCBleX64LltIKGtOhOzDm5lpdUSi30lBmSE581/PkkfTca//LeW4THXFMROi9dDEnMbxtJZkJQOaK4Uz8wRj1GnbIxILf//eQgrVB1z7NUojvX2mkltxpSy5a/WYgDTww81bnxm2fSCgpO+fRs29KfLnKfJS1fcNQMi5y",
      "body": "{\"eventID\":\"b780f05a315ac5476a0be3cb25aa5f69\",\"eventName\":\"INSERT\",\"eventVersion\":\"1.1\",\"eventSource\":\"aws:dynamodb\",\"awsRegion\":\"us-west-2\",\"dynamodb\":{\"ApproximateCreationDateTime\":1626251378,\"Keys\":{\"sk\":{\"S\":\"learning#1626251378210#0a5f6e1d-cf5a-403d-bbc6-c60dec679f10\"},\"pk\":{\"S\":\"cup1#EXTERNAL_SYSTEM\"}},\"NewImage\":{\"student_userid\":{\"S\":\"276705f4-e47d-11eb-a1f2-0242ac110002\"},\"product\":{\"M\":{\"code\":{\"S\":\"ielts_pe\"}}},\"productcode\":{\"S\":\"ielts_pe\"},\"org\":{\"S\":\"sh_thor_cup1_1\"},\"created\":{\"N\":\"1626251378210\"},\"verb\":{\"S\":\"evaluated_external\"},\"type\":{\"S\":\"learning\"},\"bundle-codes\":{\"L\":[{\"S\":\"ielts_bundle\"}]},\"created_by\":{\"S\":\"EXTERNAL_SYSTEM\"},\"version\":{\"N\":\"1\"},\"platform\":{\"M\":{\"toolClientId\":{\"S\":\"eee6a90efaaf4538b89a526d0dbd0b6d\"},\"platformId\":{\"S\":\"92e3da11b8\"}}},\"space_key\":{\"S\":\"user_6639605c0e854605b9bbf2fe166aed28\"},\"actor\":{\"M\":{\"ext_user_id\":{\"S\":\"EXTERNAL_SYSTEM\"},\"uuid\":{\"S\":\"EXTERNAL_SYSTEM\"}}},\"actorid\":{\"S\":\"EXTERNAL_SYSTEM\"},\"gsi_1_2_sk\":{\"S\":\"learning#evaluated_external#1626251378210\"},\"sk\":{\"S\":\"learning#1626251378210#0a5f6e1d-cf5a-403d-bbc6-c60dec679f10\"},\"modified\":{\"N\":\"1626251378210\"},\"pk\":{\"S\":\"cup1#EXTERNAL_SYSTEM\"},\"account\":{\"S\":\"cup1\"},\"entity\":{\"M\":{\"lti\":{\"M\":{\"activityProgress\":{\"S\":\"Completed\"},\"gradingProgress\":{\"S\":\"FullyGraded\"}}},\"result\":{\"S\":\"{\\\"score\\\":{\\\"min\\\":0,\\\"scaled\\\":0,\\\"max\\\":8,\\\"raw\\\":0},\\\"ext_data\\\":\\\"{\\\\\\\"userId\\\\\\\":\\\\\\\"6639605c0e854605b9bbf2fe166aed28\\\\\\\",\\\\\\\"scoreGiven\\\\\\\":0,\\\\\\\"scoreMaximum\\\\\\\":8,\\\\\\\"comment\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"timestamp\\\\\\\":\\\\\\\"2021-07-14T08:29:32.888Z\\\\\\\",\\\\\\\"activityProgress\\\\\\\":\\\\\\\"Completed\\\\\\\",\\\\\\\"gradingProgress\\\\\\\":\\\\\\\"FullyGraded\\\\\\\",\\\\\\\"https://www.cambridgeassessment.org.uk/lti/testInstanceId\\\\\\\":215316,\\\\\\\"https://www.cambridgeassessment.org.uk/lti/items/feedback\\\\\\\":{\\\\\\\"examId\\\\\\\":\\\\\\\"14425ff4-19b8-4a8f-a505-6b16714bb845\\\\\\\",\\\\\\\"created\\\\\\\":\\\\\\\"2021-07-14T08:29:32.646Z\\\\\\\",\\\\\\\"examTitle\\\\\\\":\\\\\\\"IELTSi_T1\\\\\\\",\\\\\\\"responses\\\\\\\":[{\\\\\\\"skill\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"context\\\\\\\":null,\\\\\\\"correct\\\\\\\":false,\\\\\\\"subskill\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"tryAgain\\\\\\\":null,\\\\\\\"attempted\\\\\\\":false,\\\\\\\"inputText\\\\\\\":null,\\\\\\\"explanation\\\\\\\":null,\\\\\\\"givenAnswer\\\\\\\":null,\\\\\\\"correctAnswer\\\\\\\":\\\\\\\"Industrialisation: Transforming the economy\\\\\\\",\\\\\\\"taskReference\\\\\\\":\\\\\\\"IELTSi4optMCQglobal_Clone\\\\\\\",\\\\\\\"questionNumber\\\\\\\":1,\\\\\\\"questionReference\\\\\\\":\\\\\\\"315f6b18-4acf-4ac2-8ad2-2917a48f57df\\\\\\\",\\\\\\\"distractorLevelFeedback\\\\\\\":\\\\\\\"Remember that it is always worth giving an answer, even if you are not completely sure that it is right. You will not lose any more marks if you get an answer wrong.\\\\\\\",\\\\\\\"mediaUrl\\\\\\\":null,\\\\\\\"transcript\\\\\\\":null},{\\\\\\\"skill\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"context\\\\\\\":null,\\\\\\\"correct\\\\\\\":false,\\\\\\\"subskill\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"tryAgain\\\\\\\":null,\\\\\\\"attempted\\\\\\\":false,\\\\\\\"inputText\\\\\\\":null,\\\\\\\"explanation\\\\\\\":null,\\\\\\\"givenAnswer\\\\\\\":null,\\\\\\\"correctAnswer\\\\\\\":\\\\\\\"A   there was a need for new ways of attracting customers.\\\\\\\",\\\\\\\"taskReference\\\\\\\":\\\\\\\"Clone\\\\\\\",\\\\\\\"questionNumber\\\\\\\":2,\\\\\\\"questionReference\\\\\\\":\\\\\\\"ccd9096b-a7fb-4c27-af67-5956ed896e37\\\\\\\",\\\\\\\"distractorLevelFeedback\\\\\\\":\\\\\\\"Remember that it is always worth giving an answer, even if you are not completely sure that it is right. You will not lose any more marks if you get an answer wrong.\\\\\\\",\\\\\\\"mediaUrl\\\\\\\":null,\\\\\\\"transcript\\\\\\\":null},{\\\\\\\"skill\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"context\\\\\\\":\\\\\\\"Test player\\\\\\\\n      Please complete sentence using the below dropdown.I am riding on my purple  __________ \\\\\\\\ndown the street.\\\\\\\",\\\\\\\"correct\\\\\\\":false,\\\\\\\"subskill\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"tryAgain\\\\\\\":null,\\\\\\\"attempted\\\\\\\":false,\\\\\\\"inputText\\\\\\\":\\\\\\\"Test player\\\\\\\\n      Please complete sentence using the below dropdown.I am riding on my purple  __________ \\\\\\\\ndown the street.\\\\\\\",\\\\\\\"explanation\\\\\\\":null,\\\\\\\"givenAnswer\\\\\\\":null,\\\\\\\"correctAnswer\\\\\\\":\\\\\\\"bicycle\\\\\\\",\\\\\\\"taskReference\\\\\\\":\\\\\\\"Jetpack1\\\\\\\",\\\\\\\"questionNumber\\\\\\\":3,\\\\\\\"questionReference\\\\\\\":\\\\\\\"d434f743-5662-4018-8b2d-8d9b5f04b73f\\\\\\\",\\\\\\\"distractorLevelFeedback\\\\\\\":\\\\\\\"Remember that it is always worth giving an answer, even if you are not completely sure that it is right. You will not lose any more marks if you get an answer wrong.\\\\\\\",\\\\\\\"mediaUrl\\\\\\\":null,\\\\\\\"transcript\\\\\\\":null},{\\\\\\\"skill\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"context\\\\\\\":\\\\\\\"Test player\\\\\\\\n      \\\\\\\\n      Please complete the sentenceThe image shows  __________ \\\\\\\\n color for the bicycle.\\\\\\\",\\\\\\\"correct\\\\\\\":false,\\\\\\\"subskill\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"tryAgain\\\\\\\":null,\\\\\\\"attempted\\\\\\\":false,\\\\\\\"inputText\\\\\\\":\\\\\\\"Test player\\\\\\\\n      \\\\\\\\n      Please complete the sentenceThe image shows  __________ \\\\\\\\n color for the bicycle.\\\\\\\",\\\\\\\"explanation\\\\\\\":null,\\\\\\\"givenAnswer\\\\\\\":null,\\\\\\\"correctAnswer\\\\\\\":\\\\\\\"Purple\\\\\\\",\\\\\\\"taskReference\\\\\\\":\\\\\\\"Jetpack7\\\\\\\",\\\\\\\"questionNumber\\\\\\\":4,\\\\\\\"questionReference\\\\\\\":\\\\\\\"d0ceb2d1-ebfe-4404-a59c-b907e4b520b8\\\\\\\",\\\\\\\"distractorLevelFeedback\\\\\\\":\\\\\\\"Remember that it is always worth giving an answer, even if you are not completely sure that it is right. You will not lose any more marks if you get an answer wrong.\\\\\\\",\\\\\\\"mediaUrl\\\\\\\":null,\\\\\\\"transcript\\\\\\\":null},{\\\\\\\"skill\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"context\\\\\\\":\\\\\\\"Test player\\\\\\\\n      \\\\\\\\n      Complete the four sentences below.Orangutans live in the  __________ People are...\\\\\\\",\\\\\\\"correct\\\\\\\":false,\\\\\\\"subskill\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"tryAgain\\\\\\\":null,\\\\\\\"attempted\\\\\\\":false,\\\\\\\"inputText\\\\\\\":\\\\\\\"Test player\\\\\\\\n      \\\\\\\\n      Complete the four sentences below.Orangutans live in the  __________ People are  __________ \\\\\\\\n the rainforest. __________ \\\\\\\\n is a problem for animals on the land and in the oceans.If  __________ \\\\\\\\n becomes extinct lots of plants will die.\\\\\\\",\\\\\\\"explanation\\\\\\\":null,\\\\\\\"givenAnswer\\\\\\\":null,\\\\\\\"correctAnswer\\\\\\\":\\\\\\\"rainforest\\\\\\\",\\\\\\\"taskReference\\\\\\\":\\\\\\\"Jetpack8\\\\\\\",\\\\\\\"questionNumber\\\\\\\":5,\\\\\\\"questionReference\\\\\\\":\\\\\\\"e4a03784-5741-42eb-ab04-b14438ec1c27\\\\\\\",\\\\\\\"distractorLevelFeedback\\\\\\\":\\\\\\\"Remember that it is always worth giving an answer, even if you are not completely sure that it is right. You will not lose any more marks if you get an answer wrong.\\\\\\\",\\\\\\\"mediaUrl\\\\\\\":null,\\\\\\\"transcript\\\\\\\":null},{\\\\\\\"skill\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"context\\\\\\\":\\\\\\\"...People are  __________ \\\\\\\\n the rainforest....\\\\\\\",\\\\\\\"correct\\\\\\\":false,\\\\\\\"subskill\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"tryAgain\\\\\\\":null,\\\\\\\"attempted\\\\\\\":false,\\\\\\\"inputText\\\\\\\":\\\\\\\"Test player\\\\\\\\n      \\\\\\\\n      Complete the four sentences below.Orangutans live in the  __________ People are  __________ \\\\\\\\n the rainforest. __________ \\\\\\\\n is a problem for animals on the land and in the oceans.If  __________ \\\\\\\\n becomes extinct lots of plants will die.\\\\\\\",\\\\\\\"explanation\\\\\\\":null,\\\\\\\"givenAnswer\\\\\\\":null,\\\\\\\"correctAnswer\\\\\\\":\\\\\\\"destroying\\\\\\\",\\\\\\\"taskReference\\\\\\\":\\\\\\\"Jetpack8\\\\\\\",\\\\\\\"questionNumber\\\\\\\":6,\\\\\\\"questionReference\\\\\\\":\\\\\\\"8efe215c-043d-4956-b736-2efa9d97d01c\\\\\\\",\\\\\\\"distractorLevelFeedback\\\\\\\":\\\\\\\"Remember that it is always worth giving an answer, even if you are not completely sure that it is right. You will not lose any more marks if you get an answer wrong.\\\\\\\",\\\\\\\"mediaUrl\\\\\\\":null,\\\\\\\"transcript\\\\\\\":null},{\\\\\\\"skill\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"context\\\\\\\":\\\\\\\"...the rainforest. __________ \\\\\\\\n is a problem for animals on the land and in the oceans.If...\\\\\\\",\\\\\\\"correct\\\\\\\":false,\\\\\\\"subskill\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"tryAgain\\\\\\\":null,\\\\\\\"attempted\\\\\\\":false,\\\\\\\"inputText\\\\\\\":\\\\\\\"Test player\\\\\\\\n      \\\\\\\\n      Complete the four sentences below.Orangutans live in the  __________ People are  __________ \\\\\\\\n the rainforest. __________ \\\\\\\\n is a problem for animals on the land and in the oceans.If  __________ \\\\\\\\n becomes extinct lots of plants will die.\\\\\\\",\\\\\\\"explanation\\\\\\\":null,\\\\\\\"givenAnswer\\\\\\\":null,\\\\\\\"correctAnswer\\\\\\\":\\\\\\\"pollution\\\\\\\",\\\\\\\"taskReference\\\\\\\":\\\\\\\"Jetpack8\\\\\\\",\\\\\\\"questionNumber\\\\\\\":7,\\\\\\\"questionReference\\\\\\\":\\\\\\\"b115a83c-d9a8-4aac-837b-44fef4c4794b\\\\\\\",\\\\\\\"distractorLevelFeedback\\\\\\\":\\\\\\\"Remember that it is always worth giving an answer, even if you are not completely sure that it is right. You will not lose any more marks if you get an answer wrong.\\\\\\\",\\\\\\\"mediaUrl\\\\\\\":null,\\\\\\\"transcript\\\\\\\":null},{\\\\\\\"skill\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"context\\\\\\\":\\\\\\\"...is a problem for animals on the land and in the oceans.If  __________ \\\\\\\\n becomes extinct lots of plants will die.\\\\\\\",\\\\\\\"correct\\\\\\\":false,\\\\\\\"subskill\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"tryAgain\\\\\\\":null,\\\\\\\"attempted\\\\\\\":false,\\\\\\\"inputText\\\\\\\":\\\\\\\"Test player\\\\\\\\n      \\\\\\\\n      Complete the four sentences below.Orangutans live in the  __________ People are  __________ \\\\\\\\n the rainforest. __________ \\\\\\\\n is a problem for animals on the land and in the oceans.If  __________ \\\\\\\\n becomes extinct lots of plants will die.\\\\\\\",\\\\\\\"explanation\\\\\\\":null,\\\\\\\"givenAnswer\\\\\\\":null,\\\\\\\"correctAnswer\\\\\\\":\\\\\\\"bees\\\\\\\",\\\\\\\"taskReference\\\\\\\":\\\\\\\"Jetpack8\\\\\\\",\\\\\\\"questionNumber\\\\\\\":8,\\\\\\\"questionReference\\\\\\\":\\\\\\\"526b3703-1194-4271-b3e9-5344e6b8f398\\\\\\\",\\\\\\\"distractorLevelFeedback\\\\\\\":\\\\\\\"Remember that it is always worth giving an answer, even if you are not completely sure that it is right. You will not lose any more marks if you get an answer wrong.\\\\\\\",\\\\\\\"mediaUrl\\\\\\\":null,\\\\\\\"transcript\\\\\\\":null}],\\\\\\\"sessionId\\\\\\\":\\\\\\\"5f1a8ff6-56fc-4f05-af73-f119da2569f2\\\\\\\",\\\\\\\"studentId\\\\\\\":\\\\\\\"1093637\\\\\\\",\\\\\\\"templateId\\\\\\\":\\\\\\\"IELTSI_PIE\\\\\\\",\\\\\\\"overallResults\\\\\\\":{\\\\\\\"skills\\\\\\\":[{\\\\\\\"name\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"cutoffs\\\\\\\":[{\\\\\\\"name\\\\\\\":\\\\\\\"OK\\\\\\\",\\\\\\\"value\\\\\\\":50},{\\\\\\\"name\\\\\\\":\\\\\\\"GOOD\\\\\\\",\\\\\\\"value\\\\\\\":70}],\\\\\\\"subskills\\\\\\\":[{\\\\\\\"name\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"cutoffs\\\\\\\":[{\\\\\\\"name\\\\\\\":\\\\\\\"OK\\\\\\\",\\\\\\\"value\\\\\\\":50},{\\\\\\\"name\\\\\\\":\\\\\\\"GOOD\\\\\\\",\\\\\\\"value\\\\\\\":70}],\\\\\\\"aboveCutoff\\\\\\\":false,\\\\\\\"description\\\\\\\":\\\\\\\"unknown_value\\\\\\\",\\\\\\\"displayName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"feedbackText\\\\\\\":\\\\\\\"unknown_value for below-cutoff\\\\\\\",\\\\\\\"totalCorrect\\\\\\\":0,\\\\\\\"levelAchieved\\\\\\\":null,\\\\\\\"percentageResult\\\\\\\":0,\\\\\\\"maxPossibleTotalCorrect\\\\\\\":8}],\\\\\\\"aboveCutoff\\\\\\\":false,\\\\\\\"description\\\\\\\":\\\\\\\"unknown_value\\\\\\\",\\\\\\\"displayName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"feedbackText\\\\\\\":\\\\\\\"unknown_value for below-cutoff\\\\\\\",\\\\\\\"totalCorrect\\\\\\\":0,\\\\\\\"levelAchieved\\\\\\\":null,\\\\\\\"percentageResult\\\\\\\":0,\\\\\\\"maxPossibleTotalCorrect\\\\\\\":8}],\\\\\\\"cutoffs\\\\\\\":[{\\\\\\\"name\\\\\\\":\\\\\\\"GOOD\\\\\\\",\\\\\\\"value\\\\\\\":70},{\\\\\\\"name\\\\\\\":\\\\\\\"OK\\\\\\\",\\\\\\\"value\\\\\\\":50}],\\\\\\\"aboveCutoff\\\\\\\":false,\\\\\\\"totalCorrect\\\\\\\":0,\\\\\\\"levelAchieved\\\\\\\":null,\\\\\\\"percentageResult\\\\\\\":0,\\\\\\\"maxPossibleTotalCorrect\\\\\\\":8},\\\\\\\"resultsComplete\\\\\\\":true,\\\\\\\"sessionReference\\\\\\\":\\\\\\\"215316\\\\\\\"}}\\\"}\"},\"part\":{\"N\":\"2\"},\"verb\":{\"S\":\"evaluated_external\"},\"submission_order\":{\"N\":\"1\"},\"timestamp\":{\"N\":\"1626251372888\"},\"item-code\":{\"S\":\"1594044177235\"}}},\"extStudentId\":{\"S\":\"6639605c0e854605b9bbf2fe166aed28\"}},\"SequenceNumber\":\"246843000000000033860298741\",\"SizeBytes\":8898,\"StreamViewType\":\"NEW_IMAGE\"},\"eventSourceARN\":\"arn:aws:dynamodb:us-west-2:567434252311:table/Realm_asgard.thor_events/stream/2021-05-28T07:21:50.922\"}",
      "attributes": {
          "ApproximateReceiveCount": "5",
          "SentTimestamp": "1626251387640",
          "SenderId": "AIDAIYLAVTDLUXBIEIX46",
          "ApproximateFirstReceiveTimestamp": "1626251387640"
      },
      "messageAttributes": {},
      "md5OfBody": "7d19a8a28211bce0b888853e9d80af90",
      "eventSource": "aws:sqs",
      "eventSourceARN": "arn:aws:sqs:us-west-2:003801200385:cup-central-local-ges-s-queueForFeedbackEmail",
      "awsRegion": "us-west-2"
  }

  ]
}

module.exports = event1;