import React from "react";
import Form from "./components/Form";
import FormItem from "./components/FormItem";
import Button from "./components/Button";
import "./App.css";
import Checkbox from "./components/Checkbox";
import Header from "./components/Header";
import Tag from "./components/Tag";
import Input from "./components/Input";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Cascader } from "antd";

const App = () => {
  // const handleSubmit = (data) => {
  //   console.log("Form Submitted: " + JSON.stringify(data));
  //   alert("Form submitted");
  // };

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const residences = [
    {
      value: "zhejiang",
      label: "Zhejiang",
      children: [
        {
          value: "hangzhou",
          label: "Hangzhou",
          children: [
            {
              value: "xihu",
              label: "West Lake",
            },
          ],
        },
      ],
    },
    {
      value: "jiangsu",
      label: "Jiangsu",
      children: [
        {
          value: "nanjing",
          label: "Nanjing",
          children: [
            {
              value: "zhonghuamen",
              label: "Zhong Hua Men",
            },
          ],
        },
      ],
    },
  ];
  return (
    <div className="container">
      {/* BASIC FORM */}
      <div className="form-container">
        <Header
          heading="Basic Form"
          description="Basic Form data control. Includes initial values, validation and submit"
        />
        <Form
          initialValues={{ rememberMe: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <FormItem
            name="username"
            label="Username: "
            type="text"
            placeholder="Enter username"
            rules={[
              { required: true, errorMessage: "Please input your username!" },
            ]}
          />

          <FormItem
            name="password"
            label="Password: "
            type="password"
            placeholder="Enter password"
            rules={[
              { required: true, errorMessage: "Please input your password!" },
              {
                validator: (value) => !value || value.length > 6,
                errorMessage: "Password must be more than 6 character",
              },
            ]}
          />
          <FormItem name="rememberMe" valuePropName="checked">
            <Checkbox>Remember Me</Checkbox>
          </FormItem>

          <div className="button-section">
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>
        </Form>
      </div>

      {/* FORM METHODS*/}
      <div className="form-container">
        <Header
          heading="Form methods"
          description="Call form method with Form.useForm"
        />
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          defaultValues={{ note: "Hey, How are you?", gender: "Male" }}
        >
          <FormItem
            name="note"
            label="Note: "
            type="text"
            placeholder="Enter your note"
            rules={[
              { required: true, errorMessage: "Please input your note!" },
            ]}
          />

          <FormItem
            name="gender"
            label="Gender: "
            type="select"
            rules={[
              { required: true, errorMessage: "Please select your gender!" },
            ]}
            options={["Male", "Female", "Other"]}
          />
          <div className="button-section">
            <Button type="submit" variant="primary">
              Submit
            </Button>
            <Button type="reset" variant="secondary">
              Reset
            </Button>
            <Button type="fill" variant="tertiary">
              Fill Form
            </Button>
          </div>
        </Form>
      </div>

      {/* FORM LAYOUT*/}
      <div className="form-container">
        <Header
          heading="Form layout"
          description="There are three layour for form: horizontal, vertical, inline"
        />
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <FormItem
            name="fielda"
            label="Field A: "
            placeholder="input placeholder"
          />
          <FormItem
            name="fieldb"
            label="Field B: "
            placeholder="input placeholder"
          />
        </Form>
      </div>

      {/* FORM DISABLED*/}
      <div className="form-container">
        <Header
          heading="Form disabled"
          description="Set component to disabled"
        />
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          disabled={true}
        >
          <FormItem
            name="input"
            label="Input: "
            type="text"
            placeholder="sample input"
          />

          <FormItem
            name="select"
            label="Select: "
            type="select"
            options={["a", "b", "c"]}
          />

          <FormItem
            name="radio"
            label="Radio: "
            type="radio"
            options={["Apple", "Pear"]}
          />

          <FormItem name="date" label="Date: " type="date" />

          <FormItem name="time" label="Time: " type="time" />

          <FormItem name="color" label="Color Picker: " type="color" />

          <FormItem
            name="dateandtime"
            label="Date & Time:"
            type="datetime-local"
          />
          <FormItem name="file" label="Upload Resume: " type="file" />
          <FormItem name="textarea" label="TextArea: " type="textarea" />

          <div className="button-section">
            <Button type="reset">Submit</Button>
          </div>
        </Form>
      </div>

      {/* FORM VARIANTS */}
      <div className="form-container">
        <Header
          heading="Form variants"
          description="Change the variant of all components in the form : outlined, filled, borderless and underlined"
        />
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          variant="underlined"
        >
          <FormItem
            name="input"
            label="Input: "
            type="text"
            rules={[
              { required: true, errorMessage: "Please input this field" },
            ]}
          />
          <FormItem
            name="inputnumber"
            label="InputNumber: "
            type="number"
            rules={[
              { required: true, errorMessage: "Please input this field" },
            ]}
          />

          <FormItem
            name="textarea"
            label="TextArea: "
            type="textarea"
            rules={[
              { required: true, errorMessage: "Please input this field" },
            ]}
          />
          <FormItem
            name="mentions"
            label="Mentions: "
            type="text"
            rules={[
              { required: true, errorMessage: "Please input this field" },
            ]}
          />

          <FormItem
            name="select"
            label="Select: "
            type="select"
            options={["a", "b", "c"]}
            rules={[
              { required: true, errorMessage: "Please input this field" },
            ]}
          />
          <FormItem
            name="date"
            label="Date: "
            type="date"
            rules={[
              { required: true, errorMessage: "Please input this field" },
            ]}
          />
          <div className="button-section">
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>
        </Form>
      </div>

      {/* REQUIRED STYLE */}
      <div className="form-container">
        <Header
          heading="Required Style"
          description="Swith required or optional style with requiredMark"
        />
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          requiredMark={{
            type: "customize",
            render: (isRequired) =>
              isRequired ? (
                <Tag text="Required" style="required-box" />
              ) : (
                <Tag text="Optional" style="optional-box" />
              ),
          }}
          // requiredMark={{ type: "optional" }}
        >
          <FormItem
            name="fielda"
            label="Field A: "
            placeholder="input placeholder"
            rules={[
              { required: true, errorMessage: "Please input your username!" },
            ]}
          />
          <FormItem
            name="fieldb"
            label="Field B: "
            placeholder="input placeholder"
          />
        </Form>
      </div>

      {/* FORM SIZE */}
      <div className="form-container">
        <Header
          heading="Form size"
          description="Set component size: small, default, large"
        />
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed} size="small">
          <FormItem
            name="input"
            label="Input: "
            type="text"
            placeholder="Enter input"
            rules={[
              { required: true, errorMessage: "Please input this field" },
            ]}
          />
          <FormItem
            name="select"
            label="Select: "
            type="select"
            options={["a", "b", "c"]}
            rules={[
              { required: true, errorMessage: "Please input this field" },
            ]}
          />
          <FormItem
            name="date"
            label="Date: "
            type="date"
            rules={[
              { required: true, errorMessage: "Please input this field" },
            ]}
          />
        </Form>
      </div>

      {/* LABEL WRAP */}
      <div className="form-container">
        <Header
          heading="Label can wrap"
          description="Turn on labelWrap to wrap label if text is long"
        />
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed} labelWrap>
          <FormItem
            name="input"
            label="Normal label: "
            type="text"
            rules={[
              { required: true, errorMessage: "Please input this field" },
            ]}
          />
          <FormItem
            name="input"
            label="A super long label text: "
            type="text"
            rules={[
              { required: true, errorMessage: "Please input this field" },
            ]}
          />
          <FormItem
            name="input"
            label="A super long label text: "
            type="text"
          />
        </Form>
      </div>

      {/* NO BLOCK RULE */}
      <div className="form-container">
        <Header
          heading="No Block rule"
          description="rule with warningOnly will not block form submit"
        />
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          defaultValues={{ url: "https://google.com" }}
        >
          <FormItem
            name="url"
            label="URL:  "
            type="url"
            rules={[
              { required: true, errorMessage: "Please input this field" },
              {
                validator: (value) => !value || value.length < 20,
                errorMessage: "URL must be at 20 characters long",
                warningOnly: true,
              },
            ]}
          />
          <div className="button-section">
            <Button type="submit" variant="primary">
              Submit
            </Button>
            <Button type="fill" variant="tertiary">
              Fill Form
            </Button>
          </div>
        </Form>
      </div>

      {/* VALIDATE TRIGGER */}
      <div className="form-container">
        <Header
          heading="Validate Trigger"
          description="Change the verification timing through validateTrigger, or change the verification frequency through validateDebounce, or set the verification short circuit through validateFirst"
        />
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <FormItem
            hasFeedback
            name="field1"
            label="Field A  "
            type="text"
            validateTrigger="onBlur"
            placeholder="Validates onBlur"
            rules={[
              {
                validator: (value) => !value || value.length <= 3,
                errorMessage: "Text chars must be less than or equal to 3",
              },
            ]}
          />

          <FormItem
            hasFeedback
            name="field2"
            label="Field B  "
            type="text"
            validateDebounce={1000}
            placeholder="Validate requires debounce after 3s"
            rules={[
              {
                validator: (value) => !value || value.length <= 3,
                errorMessage: "Text chars must be less than or equal to 3",
              },
            ]}
          />
          <FormItem
            hasFeedback
            name="field3"
            label="Field C  "
            type="text"
            validateFirst
            rules={[
              {
                validator: (value) => !value || value.length >= 10,
                errorMessage: "Text chars must be greater than 10",
              },
              {
                validator: (value) => !value || value.length <= 3,
                errorMessage: "Text chars must be less than or equal to 3",
              },
            ]}
          />
        </Form>
      </div>

      {/* CUSTOMIZED VALIDATION */}
      <div className="form-container">
        <Header
          heading="Customized Validation"
          description="We provide properties like validateStatus help hasFeedback to customize your own validate status and message, without using Form."
        />
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <FormItem
            name="fail"
            label="Fail:  "
            type="text"
            validateStatus="error"
            help="Should be combination of numbers & alphabets"
          />
          <FormItem
            name="warning"
            label="Warning:  "
            type="text"
            validateStatus="warning"
          />
          <FormItem
            name="validating"
            label="Validating:  "
            type="text"
            hasFeedback
            validateStatus="validating"
            help="The information is being validated"
          />
          <FormItem
            name="success"
            label="Success:  "
            type="text"
            hasFeedback
            validateStatus="success"
            placeholder="I'm the content"
          />
          <FormItem
            name="warning"
            label="Warning:  "
            type="text"
            hasFeedback
            validateStatus="warning"
          />
          <FormItem
            name="fail"
            label="Fail:  "
            type="text"
            hasFeedback
            validateStatus="error"
          />
        </Form>
      </div>

      {/* INLINE LOGIN FORM */}
      <div className="form-container">
        <Header
          heading="Inline Login Form"
          description="Inline login form is often used in navigation bar."
        />
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="inline"
        >
          <FormItem
            name="sampleusername"
            type="text"
            placeholder="Username"
            prefix={<UserOutlined />}
          >
            <Input />
          </FormItem>
          <FormItem
            name="samplepassword"
            type="password"
            placeholder="Password"
            prefix={<LockOutlined />}
            rules={[
              {
                validator: (value) => !value || value.length > 6,
                errorMessage: "Password must be more than 6 character",
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem>
            <Button type="submit" variant="primary">
              Log In
            </Button>
          </FormItem>
        </Form>
      </div>

      {/* REGISTRATION */}
      <div className="form-container">
        <Header
          heading="Registration"
          description="Fill in this form to create a new account for you."
        />
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{}}
          labelWrap
        >
          <FormItem
            name="email"
            label="Email: "
            type="email"
            rules={[
              { required: true, errorMessage: "Please input this field!" },
            ]}
          />
          <FormItem
            name="password"
            label="Password: "
            type="password"
            rules={[
              { required: true, errorMessage: "Please input this field!" },
            ]}
          />
          <FormItem
            name="confirmpassword"
            label="Confirm Password: "
            type="password"
            rules={[
              { required: true, errorMessage: "Please input this field!" },
            ]}
          />
          <FormItem
            name="nickname"
            label="Nickname: "
            type="text"
            tooltip="What do you want other to call you?"
            rules={[
              { required: true, errorMessage: "Please input this field!" },
            ]}
          />
          <FormItem
            name="phonenumber"
            label="Phone Number: "
            type="tel"
            rules={[
              { required: true, errorMessage: "Please input this field!" },
            ]}
          />
          <FormItem
            label="Habitual Residence"
            name="residence"
            rules={[
              { required: true, errorMessage: "Please input this field" },
            ]}
          >
            <Cascader options={residences} />
          </FormItem>
          <FormItem
            name="donation"
            label="Donation: "
            type="number"
            rules={[
              { required: true, errorMessage: "Please input this field!" },
            ]}
          />

          <FormItem
            name="website"
            label="Website: "
            type="url"
            rules={[
              { required: true, errorMessage: "Please input this field!" },
            ]}
          />
          <FormItem
            name="intro"
            label="Intro: "
            type="textarea"
            rules={[
              { required: true, errorMessage: "Please input this field!" },
            ]}
          />

          <FormItem
            name="gender"
            label="Gender: "
            type="select"
            rules={[
              { required: true, errorMessage: "Please select your gender!" },
            ]}
            options={["Male", "Female", "Other"]}
          />
          <FormItem name="agreement">
            <Checkbox>I have read the agreement</Checkbox>
          </FormItem>
          <div className="button-section">
            <Button type="submit" variant="primary">
              Register
            </Button>
          </div>
        </Form>
      </div>

      {/* DEPENDENCIES */}
      <div className="form-container">
        <Header
          heading="Dependencies"
          description="Form.Item can set the associated field through the dependencies property. When the value of the associated field changes, the validation and update will be triggered.

"
        />
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed} labelWrap>
          <FormItem
            validateTrigger="onChange"
            name="password"
            label="Password: "
            type="text"
            rules={[
              { required: true, errorMessage: "Please input this field!" },
              {
                validator: (value) => value.length >= 6,
                errorMessage: "Password must be at least 6 characters",
              },
            ]}
          />
          <FormItem
            validateTrigger="onChange"
            name="confirmpassword"
            label="Confirm Password: "
            type="text"
            dependencies={["password"]}
            rules={[
              { required: true, errorMessage: "Please input this field!" },
              {
                validator: (value, allValues) => value === allValues.password,
                errorMessage: "Passwords do not match",
              },
            ]}
          />
        </Form>
      </div>

      {/* DYNAMIC RULES */}
      <div className="form-container">
        <Header
          heading="Dynamic Rules"
          description="Perform diffrent check rules according to different situations."
        />
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <FormItem
            name="name"
            label="Name"
            rules={[{ required: true, errorMessage: "Name is required" }]}
          />
          <FormItem
            name="nickname"
            label="Nickname"
            dependencies={["hasNickname"]}
            rules={[
              ({ getFormValues }) => {
                const values = getFormValues();
                return {
                  required: values?.hasNickname,
                  errorMessage: "Nickname is required when checkbox is checked",
                };
              },
            ]}
          />

          <FormItem name="hasNickname" valuePropName="checked">
            <Checkbox>Nickname is required</Checkbox>
          </FormItem>

          <div className="button-section">
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default App;
