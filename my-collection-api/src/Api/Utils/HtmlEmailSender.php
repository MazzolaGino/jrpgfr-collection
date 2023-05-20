<?php 

namespace MyCollectionApi\Api\Utils;

use PHPMailer\PHPMailer\PHPMailer;

class HtmlEmailSender {
    private $mailer;
    
    public function __construct() {
        $this->mailer = new PHPMailer();
        $this->mailer->isHTML(true);
    }
    
    public function setFrom($fromEmail, $fromName = '') {
        $this->mailer->setFrom($fromEmail, $fromName);
    }
    
    public function setTo($toEmail, $toName = '') {
        $this->mailer->addAddress($toEmail, $toName);
    }
    
    public function setSubject($subject) {
        $this->mailer->Subject = $subject;
    }
    
    public function setMessage($message) {
        $this->mailer->Body = $message;
    }
    
    public function addHeader($headerName, $headerValue) {
        $this->mailer->addCustomHeader($headerName, $headerValue);
    }
    
    public function useSMTP($host, $port, $username, $password) {
        $this->mailer->isSMTP();
        $this->mailer->Host = $host;
        $this->mailer->Port = $port;
        $this->mailer->SMTPAuth = true;
        $this->mailer->SMTPSecure = 'tls';
        $this->mailer->Username = $username;
        $this->mailer->Password = $password;
    }
    
    public function send() {
        try {
          $ok = $this->mailer->send();
          
          var_dump($this->mailer->ErrorInfo);

          return $ok;

        } catch (\Exception $e) {
            throw new \Exception('Failed to send the email: ' . $e->getMessage());
        }
    }
}