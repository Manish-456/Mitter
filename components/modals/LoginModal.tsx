import useLoginModal from "@/hooks/useLoginModal";
import React, { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import {signIn} from 'next-auth/react';

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      //   TODO ADD LOGIN
      await signIn('credentials', {
        email,
        password
      })
      loginModal.onClose();
    } catch (error) {
    
    } finally {
      setIsLoading(false);
    }
  }, [loginModal, isLoading, email, password]);

  const onToggle = useCallback(() => {
    if (isLoading) return;
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, isLoading, registerModal]);

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        First time using Twitter?
        <span
        onClick={onToggle} 
        className="text-white hover:underline cursor-pointer">
          {" "}
          Create an account
        </span>
      </p>
    </div>
  );
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        disabled={isLoading}
      />
      <Input
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        footer={footerContent}
        title="Login"
        actionLabel="Sign In"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit}
        body={bodyContent}
      />
    </>
  );
};

export default LoginModal;
